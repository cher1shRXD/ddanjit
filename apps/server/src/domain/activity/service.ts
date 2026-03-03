import { fastify } from "../../global/server";
import { userRepository } from "../user/repository";
import { activityRepository } from "./repository";
import {
  Activity,
  BaseResponseBuilder,
  Duration,
  durationEnum,
} from "@ddanjit/domain";

export const activityService = {
  async findRandomActivity(
    email: string,
    duration: Duration,
    time: number,
    bundleId?: string,
  ) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const userId = user.id;
    const parsedBundleId = bundleId ? parseInt(bundleId) : undefined;

    const retryHistoryKey = `recommend:retry:${userId}`;
    const retryHistoryRaw = await fastify.redis.get(retryHistoryKey);
    const retryHistoryIds: number[] = retryHistoryRaw
      ? JSON.parse(retryHistoryRaw)
      : [];

    // 1. 최근 플레이 이력 확인 (5일 이내 플레이한 활동은 제외 대상)
    const recentPlayHistory = await activityRepository.getUserPlayHistory(
      userId,
      5,
    );
    const recentPlayedIds = recentPlayHistory.map((h) => h.activityId);

    // 제외할 모든 ID 통합 (최근 플레이 + 다시 찾기 히스토리)
    const excludeIds = Array.from(
      new Set([...recentPlayedIds, ...retryHistoryIds]),
    );

    // 2. 구매 이력 확인
    const purchases = await activityRepository.getUserPurchaseHistory(userId);
    const purchasedBundleIds = new Set(purchases.map((p) => p.bundleId));
    const isBundlePurchased = parsedBundleId
      ? purchasedBundleIds.has(parsedBundleId)
      : false;

    // 3. 재시도 로직 정의
    const getDurationRange = (current: string) => {
      const idx = durationEnum.indexOf(current as any);
      if (idx === -1 || idx === durationEnum.length - 1) return [current];
      return [current, durationEnum[idx + 1]!];
    };

    const attempts = [
      // Attempt 0: exact match
      {
        time,
        duration: duration as Duration[] | Duration,
        bundleId: parsedBundleId,
      },
      // Attempt 1: broaden time (+/- 1)
      {
        time: [time - 1, time + 1] as [number, number],
        duration: duration as Duration[] | Duration,
        bundleId: parsedBundleId,
      },
      // Attempt 2: broaden duration & remove bundleId
      {
        time: [time - 1, time + 1] as [number, number],
        duration: getDurationRange(duration) as Duration[] | Duration,
        bundleId: undefined,
      },
    ];

    let candidates: Activity[] = [];
    for (const attempt of attempts) {
      candidates = await activityRepository.findRecommended({
        ...attempt,
        isFreeOnly: !isBundlePurchased,
        excludeIds: excludeIds,
      });
      if (candidates.length > 0) break;
    }

    if (candidates.length === 0) {
      candidates = await activityRepository.findRecommended({
        isFreeOnly: !isBundlePurchased,
        excludeIds: [],
      });
    }

    const allPlayHistory = await activityRepository.getUserPlayHistory(userId);
    const allPlayedIds = new Set(allPlayHistory.map((h) => h.activityId));

    const unplayed = candidates.filter((c) => !allPlayedIds.has(c.id));

    let selected: Activity;
    if (unplayed.length > 0) {
      selected = unplayed[Math.floor(Math.random() * unplayed.length)];
    } else {
      selected = candidates[Math.floor(Math.random() * candidates.length)];
    }

    const newRetryHistory = [...retryHistoryIds, selected.id].slice(-10);
    await fastify.redis.set(
      retryHistoryKey,
      JSON.stringify(newRetryHistory),
      "EX",
      600,
    );

    return BaseResponseBuilder(200, "", selected);
  },
};

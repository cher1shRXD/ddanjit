import { fastify } from "../../global/server";
import { userRepository } from "../user/repository";
import { activityRepository } from "./repository";
import {
  Activity,
  BaseResponseBuilder,
  Duration,
  durationEnum,
  GlobalError,
  UserError,
} from "@ddanjit/domain";

export const activityService = {
  async findCandidates(
    email: string,
    duration: Duration,
    time: number,
    bundleId?: number,
  ) {
    if (!email) throw new Error(GlobalError.UNAUTHORIZED);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error(UserError.NOTFOUND);

    const userId = user.id;

    const retryHistoryKey = `recommend:retry:${userId}`;
    const retryHistoryRaw = await fastify.redis.get(retryHistoryKey);
    const retryHistoryIds: number[] = retryHistoryRaw
      ? JSON.parse(retryHistoryRaw)
      : [];

    const recentPlayHistory = await activityRepository.getUserPlayHistory(
      userId,
      5,
    );
    const recentPlayedIds = recentPlayHistory.map((h) => h.activityId);

    const excludeIds = Array.from(
      new Set([...recentPlayedIds, ...retryHistoryIds]),
    );

    const ownered = await activityRepository.getUserBundleOwnership(userId);
    const owneredBundleIds = new Set(ownered.map((p) => p.bundleId));
    const isOwneredBundle = bundleId
      ? owneredBundleIds.has(bundleId)
      : false;

    const getDurationRange = (current: Duration): Duration[] => {
      const idx = durationEnum.indexOf(current as any);
      if (idx === -1 || idx === durationEnum.length - 1) return [current];
      return [current, durationEnum[idx + 1]!];
    };

    const attempts = [
      {
        time,
        duration: duration,
        bundleId,
      },
      {
        time: [time - 1, time + 1] as [number, number],
        duration: duration,
        bundleId,
      },
      {
        time: [time - 1, time + 1] as [number, number],
        duration: getDurationRange(duration),
        bundleId: undefined,
      },
    ];

    let candidates: Activity[] = [];
    for (const attempt of attempts) {
      candidates = await activityRepository.findRecommended({
        ...attempt,
        excludeDurations: ["1"],
        isFreeOnly: !isOwneredBundle,
        excludeIds: excludeIds,
      });
      if (candidates.length > 0) break;
    }

    if (candidates.length === 0) {
      candidates = await activityRepository.findRecommended({
        excludeDurations: ["1"],
        isFreeOnly: !isOwneredBundle,
        excludeIds: [],
      });
    }

    return { candidates, userId, retryHistoryKey, retryHistoryIds };
  },

  async findRandomActivity(
    email: string,
    duration: Duration,
    time: number,
    bundleId?: number,
  ) {
    const { candidates, userId, retryHistoryKey, retryHistoryIds } =
      await this.findCandidates(email, duration, time, bundleId);

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

  async findCandidateList(
    email: string,
    duration: Duration,
    time: number,
    bundleId?: number,
  ) {
    const { candidates } = await this.findCandidates(
      email,
      duration,
      time,
      bundleId,
    );
    return BaseResponseBuilder(200, "", candidates);
  },

  async findShortActivity(email: string) {
    if (!email) throw new Error(GlobalError.UNAUTHORIZED);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error(UserError.NOTFOUND);

    const userId = user.id;
    const time = new Date().getHours();
    const duration: Duration = "1";

    const recentPlayHistory = await activityRepository.getUserPlayHistory(
      userId,
      5,
    );
    const recentPlayedIds = recentPlayHistory.map((h) => h.activityId);

    const ownered = await activityRepository.getUserBundleOwnership(userId);
    const isOwneredActivity = ownered.length > 0;

    let candidates = await activityRepository.findRecommended({
      time,
      duration,
      isFreeOnly: !isOwneredActivity,
      excludeIds: recentPlayedIds,
    });

    if (candidates.length === 0) {
      candidates = await activityRepository.findRecommended({
        duration,
        isFreeOnly: !isOwneredActivity,
        excludeIds: recentPlayedIds,
      });
    }

    if (candidates.length === 0) {
      candidates = await activityRepository.findRecommended({
        duration,
        isFreeOnly: !isOwneredActivity,
        excludeIds: [],
      });
    }

    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    return BaseResponseBuilder(200, "", selected);
  },
};

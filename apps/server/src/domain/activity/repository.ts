import {
  activityTable,
  playHistoryTable,
  SaveActivityReq,
  Duration,
  Activity,
} from "@ddanjit/domain";
import { db } from "../../global/db/mysql";
import { and, eq, inArray, notInArray, between, gt, SQL, ne } from "drizzle-orm";
import { purchaseHistoryTable } from "@ddanjit/domain";

export interface RecommendationParams {
  duration?: Duration | Duration[];
  excludeDurations?: Duration[];
  time?: number | [number, number];
  bundleId?: number;
  isFreeOnly: boolean;
  excludeIds: number[];
}

export const activityRepository = {
  // ... (findMany, findById, findByTitle remains same)
  async findMany(bundleId?: number) {
    return bundleId
      ? await db
          .select()
          .from(activityTable)
          .where(eq(activityTable.bundleId, bundleId))
      : await db.select().from(activityTable);
  },

  async findById(id: number) {
    return await db
      .select()
      .from(activityTable)
      .where(eq(activityTable.id, id))
      .then((res) => res[0] ?? null);
  },

  async findByTitle(title: string) {
    return await db
      .select()
      .from(activityTable)
      .where(eq(activityTable.title, title))
      .then((res) => res[0] ?? null);
  },

  async findRecommended({
    duration,
    excludeDurations,
    time,
    bundleId,
    isFreeOnly,
    excludeIds,
  }: RecommendationParams) {
    const filters: SQL[] = [];

    // 1. Time filter
    if (time !== undefined) {
      if (Array.isArray(time)) {
        filters.push(between(activityTable.recommendAt, time[0], time[1]));
      } else {
        filters.push(eq(activityTable.recommendAt, time));
      }
    }

    // 2. Duration filter
    if (duration !== undefined) {
      if (Array.isArray(duration)) {
        filters.push(inArray(activityTable.duration, duration));
      } else {
        filters.push(eq(activityTable.duration, duration));
      }
    }

    // 2-1. Exclude Duration filter
    if (excludeDurations !== undefined && excludeDurations.length > 0) {
      if (excludeDurations.length === 1) {
        filters.push(ne(activityTable.duration, excludeDurations[0]!));
      } else {
        filters.push(notInArray(activityTable.duration, excludeDurations));
      }
    }

    // 3. Bundle filter
    if (bundleId !== undefined) {
      filters.push(eq(activityTable.bundleId, bundleId));
    }

    // 4. Free/Paid filter
    if (isFreeOnly) {
      filters.push(eq(activityTable.isFree, true));
    }

    // 5. Exclusion filter (Retry history)
    if (excludeIds.length > 0) {
      filters.push(notInArray(activityTable.id, excludeIds));
    }

    return (await db
      .select()
      .from(activityTable)
      .where(and(...filters))) as Activity[];
  },

  async getUserPurchaseHistory(userId: number, bundleId?: number) {
    const filters: SQL[] = [eq(purchaseHistoryTable.userId, userId)];
    if (bundleId) {
      filters.push(eq(purchaseHistoryTable.bundleId, bundleId));
    }
    return await db
      .select()
      .from(purchaseHistoryTable)
      .where(and(...filters));
  },

  async getUserPlayHistory(userId: number, days?: number) {
    const filters: SQL[] = [eq(playHistoryTable.userId, userId)];

    if (days) {
      const date = new Date();
      date.setDate(date.getDate() - days);
      filters.push(gt(playHistoryTable.playedAt, date));
    }

    return await db
      .select()
      .from(playHistoryTable)
      .where(and(...filters));
  },

  async create(payload: SaveActivityReq) {
    await db.insert(activityTable).values(payload);
    return await db
      .select()
      .from(activityTable)
      .where(eq(activityTable.title, payload.title))
      .then((res) => res[0] ?? null);
  },

  async update(id: number, payload: SaveActivityReq) {
    await db.update(activityTable).set(payload).where(eq(activityTable.id, id));
  },

  async delete(id: number) {
    await db.delete(activityTable).where(eq(activityTable.id, id));
  },
};

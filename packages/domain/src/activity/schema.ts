import {
  boolean,
  datetime,
  int,
  json,
  longtext,
  mysqlEnum,
  mysqlTable,
  varchar,
  index,
} from "drizzle-orm/mysql-core";
import { durationEnum, iconEnum, skippedRecommendationEnum } from "./enums";
import { userTable } from "../user";
import { bundleTable } from "../bundle/schema";

export const activityTable = mysqlTable(
  "activity",
  {
    id: int().primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    bundleId: int("bundle_id")
      .notNull()
      .references(() => bundleTable.id),
    instruction: longtext("instruction").notNull(),
    icon: mysqlEnum("icon", iconEnum).notNull(),
    duration: mysqlEnum("duration", durationEnum).notNull(),
    content: json("content").notNull().default({}),
    isFree: boolean("is_free").notNull().default(false),
    recommendAt: int("recommend_at").notNull().default(0),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at")
      .notNull()
      .default(new Date())
      .$onUpdate(() => new Date()),
    isAccepted: boolean("is_accepted").notNull().default(false),
  },
  (table) => [
    index("idx_recommend_filter").on(
      table.recommendAt,
      table.duration,
      table.isFree,
    ),
  ],
);

export const playHistoryTable = mysqlTable("play_history", {
  id: int().primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  activityId: int("activity_id")
    .notNull()
    .references(() => activityTable.id),
  playedAt: datetime("played_at").notNull(),
  result: json("result").notNull(),
  isSkippedRecommendation: mysqlEnum(
    "is_skipped_recommendation",
    skippedRecommendationEnum,
  )
    .notNull()
    .default("no"),
});

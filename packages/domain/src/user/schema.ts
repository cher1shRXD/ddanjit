import {
  varchar,
  mysqlEnum,
  int,
  mysqlTable,
  datetime,
} from "drizzle-orm/mysql-core";
import { oauthProviderEnum, userBenefitsEnum, userEmojiEnum, userRoleEnum } from "./enums";

export const userTable = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 10 }),
  birthYear: int("birth_year").notNull().default(0),
  email: varchar("email", { length: 255 }).notNull().unique(),
  job: varchar("job", { length: 50 }),
  emoji: mysqlEnum("emoji", userEmojiEnum).notNull().default("smile"),
  level: int("level").notNull().default(1),
  coin: int("coin").notNull().default(0),
  benefit: mysqlEnum("benefit", userBenefitsEnum).notNull().default("none"),
  role: mysqlEnum("role", userRoleEnum).notNull().default("user"),
  acquisitionSource: varchar("acquisition_source", { length: 255 }),
  joinedAt: datetime("joined_at").notNull().default(new Date()),
  provider: mysqlEnum("provider", oauthProviderEnum).notNull().default("google"),
  oauthId: varchar("oauth_id", { length: 255 }).notNull().unique(),
});

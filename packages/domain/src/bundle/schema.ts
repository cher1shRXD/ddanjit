import {
  boolean,
  datetime,
  int,
  longtext,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { userTable } from "../user";

export const bundleTable = mysqlTable("bundle", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: longtext("description").notNull(),
  price: int("price").notNull().default(1900),
  createdAt: datetime("created_at").notNull().default(new Date()),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
  isPublic: boolean("is_public").notNull().default(false)
});

export const bundleOwnershipTable = mysqlTable("bundle_ownership", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  bundleId: int("bundle_id")
    .notNull()
    .references(() => bundleTable.id),
  acquiredAt: datetime("acquired_at").notNull().default(new Date()),
});

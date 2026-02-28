import { createSelectSchema } from "drizzle-zod";
import { userTable } from "./schema";
import z from "zod";

export const UserSchema = createSelectSchema(userTable)
export type User = z.infer<typeof UserSchema>
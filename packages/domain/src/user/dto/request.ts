import { createInsertSchema } from "drizzle-zod";
import { userTable } from "../schema";
import { UserError } from "../error";
import z from "zod";

export const CreateUserInfoReqSchema = createInsertSchema(userTable, {
  name: (value) =>
    value.nonempty(UserError.EMPTY_NAME).max(10, UserError.TOO_LONG_NAME),
  birthYear: (value) =>
    value
      .nonnegative(UserError.NEGATIVE_YEAR)
      .max(new Date().getFullYear() - 1, UserError.NEGATIVE_AGE)
      .default(0),
}).omit({
  name: true,
  birthYear: true,
  job: true,
  acquisitionSource: true,
});
export type CreateUserInfoReq = z.infer<typeof CreateUserInfoReqSchema>;

import { createInsertSchema } from "drizzle-zod";
import { userTable } from "../schema";
import { UserError } from "../error";
import z from "zod";

export const SaveUserInfoReqSchema = createInsertSchema(userTable, {
  name: (value) =>
    value.nonempty(UserError.EMPTY_NAME).max(10, UserError.TOO_LONG_NAME),
  birthYear: (value) =>
    value
      .nonnegative(UserError.NEGATIVE_YEAR)
      .max(new Date().getFullYear() - 1, UserError.NEGATIVE_AGE)
      .default(0),
  job: (value) => value.max(50, UserError.TOO_LONG_JOB).default(""),
}).omit({
  id: true,
  email: true,
  benefit: true,
  coin: true,
  emoji: true,
  joinedAt: true,
  role: true,
  level: true,
  oauthId: true,
  provider: true,
  acquisitionSource: true,
});
export type SaveUserInfoReq = z.infer<typeof SaveUserInfoReqSchema>;

export const SaveAcquisitionSourceReqSchema = createInsertSchema(userTable,{
  acquisitionSource: z.string().max(255, UserError.TOO_LONG_ACQUISITION_SOURCE).nullable(),
}).omit({
  id: true,
  name: true,
  birthYear: true,
  job: true,
  email: true,
  benefit: true,
  coin: true,
  emoji: true,
  joinedAt: true,
  role: true,
  level: true,
  oauthId: true,
  provider: true,
});
export type SaveAcquisitionSourceReq = z.infer<
  typeof SaveAcquisitionSourceReqSchema
>;

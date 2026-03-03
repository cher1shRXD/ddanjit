import z from "zod";
import { activityTable } from "../schema";
import { createInsertSchema } from "drizzle-zod";
import { durationEnum } from "../enums";

export const SaveActivityReqSchema = createInsertSchema(activityTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type SaveActivityReq = z.infer<typeof SaveActivityReqSchema>;

export const RecommendActivityReqSchema = z.object({
  duration: z.enum(durationEnum),
  time: z.coerce.number(),
  bundleId: z.string().optional(),
});
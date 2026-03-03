import z from "zod";
import { activityTable } from "../schema";
import { createInsertSchema } from "drizzle-zod";

export const SaveActivityReqSchema = createInsertSchema(activityTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type SaveActivityReq = z.infer<typeof SaveActivityReqSchema>;
import { createInsertSchema } from "drizzle-zod";
import { bundleTable, bundleOwnershipTable } from "../schema";
import z from "zod";

export const SaveBundleReqSchema = createInsertSchema(bundleTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type SaveBundleReq = z.infer<typeof SaveBundleReqSchema>;

export const BundleOwnershipReqSchema = createInsertSchema(bundleOwnershipTable).omit({
  id: true,
  userId: true,
  acquiredAt: true,
});
export type BundleOwnershipReq = z.infer<typeof BundleOwnershipReqSchema>;
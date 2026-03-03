import { createInsertSchema } from "drizzle-zod";
import { bundleTable, purchaseHistoryTable } from "../schema";
import z from "zod";

export const SaveBundleReqSchema = createInsertSchema(bundleTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type SaveBundleReq = z.infer<typeof SaveBundleReqSchema>;

export const PurchaseBundleReqSchema = createInsertSchema(purchaseHistoryTable).omit({
  id: true,
  userId: true,
  purchasedAt: true,
});
export type PurchaseBundleReq = z.infer<typeof PurchaseBundleReqSchema>;
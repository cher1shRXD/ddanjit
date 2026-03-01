import { RequestTypes } from "../enums/request-type";
import { z } from "zod";

export const BridgeRequestSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(RequestTypes),
  timestamp: z.number(),
  timeout: z.optional(z.number()),
  payload: z.unknown(),
});

export type BridgeRequestRaw = z.infer<typeof BridgeRequestSchema>;

export type BridgeRequest<T = unknown> = Omit<BridgeRequestRaw, "payload"> & {
  payload: T;
};
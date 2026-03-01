import {
  BridgeRequest,
  BridgeRequestSchema,
} from "../types/dto/bridge-request";

export const parseBridgeRequest = <T>(obj: T) =>
  BridgeRequestSchema.parse(obj) as BridgeRequest<T>;

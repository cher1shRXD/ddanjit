import { BridgeResponse } from "./dto/bridge-response";

export type BridgeTaskStatus = "PENDING" | "COMPLETED";

export interface BridgeTask<TResponse = unknown> {
  id: string;
  type: string;
  status: BridgeTaskStatus;
  response?: BridgeResponse<TResponse>;
  createdAt: number;
}

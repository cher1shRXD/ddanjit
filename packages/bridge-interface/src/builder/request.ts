import { BridgeRequest } from "../types/dto/bridge-request";
import { RequestType } from "../types/enums/request-type";

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const Request = <T>(
  action: RequestType,
  payload: T,
  timeout?: number,
) => {
  return {
    id: generateId(),
    timestamp: Date.now(),
    timeout,
    type: action,
    payload,
  } as BridgeRequest<T>;
};

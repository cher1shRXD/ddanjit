import type { BridgeResponse, RequestType } from "@ddanjit/bridge-interface";

export interface BridgeContext {
  bridge?: Window["ReactNativeWebView"];
  execute: <TResponse = unknown>(
    action: RequestType,
    payload: unknown,
    timeout?: number,
  ) => Promise<BridgeResponse<TResponse>>;
  subscribe: (
    type: string | "ALL",
    listener: (response: BridgeResponse<any>) => void,
  ) => () => void;
}

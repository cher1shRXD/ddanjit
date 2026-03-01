import {
  Request,
  type BridgeResponse,
  type Error,
  type PendingRequest,
  type RequestType,
} from "@ddanjit/bridge-interface";

export const execute = <TResponse = unknown>(
  bridge: Window["ReactNativeWebView"],
  addToQueue: (id: string, pending: PendingRequest) => void,
  action: RequestType,
  payload: unknown,
  timeout?: number,
): Promise<BridgeResponse<TResponse>> => {
  return new Promise((resolve, reject) => {
    const request = Request(action, payload, timeout);

    if (!bridge) {
      reject("NOT_SUPPORTED" as Error);
      return;
    }

    const pendingRequest = {
      request,
      resolve: resolve as (value: BridgeResponse<TResponse>) => void,
      reject,
    } as PendingRequest;

    addToQueue(request.id, pendingRequest);

    bridge.postMessage(JSON.stringify(request));
  });
};

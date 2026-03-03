import { Handler } from "../types/handler";
import { BridgeHandlerMap } from "../types/bridge-handler-map";
import { WebViewBridge } from "../types/webview-bridge";
import { executeHandler } from "../utils/execute-handler";
import { BridgeRequest, BridgeResponse, Error, Errors, parseBridgeRequest, RequestType, RequestTypes, Response, BridgeTask } from "@ddanjit/bridge-interface";

const QUEUE_TTL = 1000 * 60 * 60; // 1시간 후 만료

class BridgeCore {
  private handlers: BridgeHandlerMap = new Map();
  private queue: Map<string, BridgeTask<unknown>> = new Map();
  private webview?: WebViewBridge;

  register = <TPayload = unknown, TResponse = unknown>(
    type: RequestType,
    handler: Handler<TPayload, TResponse>,
  ) => {
    this.handlers.set(type, handler as Handler);
  };

  unregister = (type: RequestType) => {
    this.handlers.delete(type);
  };

  // 앱 -> 웹 푸시 API
  sendEvent = <T>(type: string, payload: T) => {
    if (!this.webview) return;
    const response = Response(`push_${Date.now()}_${Math.random()}`, type, true, payload);
    this.webview.postMessage(JSON.stringify(response));
  };

  private cleanOldTasks() {
    const now = Date.now();
    for (const [id, task] of this.queue.entries()) {
      if (now - task.createdAt > QUEUE_TTL) {
        this.queue.delete(id);
      }
    }
  }

  handleMessage = async (raw: string, webview?: WebViewBridge) => {
    if (webview) this.webview = webview;
    this.cleanOldTasks();

    let request: BridgeRequest<unknown>;
    try {
      const parsed = JSON.parse(raw);
      request = parseBridgeRequest(parsed);
    } catch (err) {
      return;
    }

    if (request.type === RequestTypes.ACK) {
      const { id } = request.payload as { id: string };
      this.queue.delete(id);
      return;
    }

    if (request.type === RequestTypes.RECOVERY) {
      const tasks = Array.from(this.queue.values());
      const response = Response(request.id, request.type, true, tasks);
      if (webview) {
        webview.postMessage(JSON.stringify(response));
      }
      return response;
    }

    const handler = this.handlers.get(request.type as RequestType);

    if (!handler) {
      const response = Response(request.id, request.type, false, undefined, Errors.NOT_SUPPORTED);
      if (webview) {
        webview.postMessage(JSON.stringify(response));
      }
      return response;
    }

    const task: BridgeTask<unknown> = {
      id: request.id,
      type: request.type,
      status: "PENDING",
      createdAt: Date.now(),
    };
    this.queue.set(request.id, task);

    let result;
    try {
      result = await executeHandler(
        Promise.resolve(handler(request.payload)),
        request.timeout,
      );
    } catch (err) {
      result = Errors.UNKNOWN;
    }

    let response: BridgeResponse<unknown>;

    if (
      typeof result === "string" &&
      Object.values(Errors).includes(result as Error)
    ) {
      response = Response(request.id, request.type, false, undefined, result as Error);
    } else if (result) {
      response = Response(request.id, request.type, true, result);
    } else if (result === null) {
      response = Response(request.id, request.type, false, undefined, Errors.CANCELLED);
    } else {
      response = Response(request.id, request.type, false, undefined, Errors.UNKNOWN);
    }

    this.queue.set(request.id, {
      ...task,
      status: "COMPLETED",
      response,
    });

    if (webview) {
      webview.postMessage(JSON.stringify(response));
    }
    return response;
  };
}

export const bridgeCore = new BridgeCore();
export const createBridgeCore = () => bridgeCore;

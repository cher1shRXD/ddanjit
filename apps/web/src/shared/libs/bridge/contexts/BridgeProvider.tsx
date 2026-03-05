"use client";

import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  type RequestType,
  type BridgeResponse,
  type PendingRequest,
  parseBridgeResponse,
  RequestTypes,
  Request,
  type BridgeTask,
} from "@ddanjit/bridge-interface";
import { BridgeContext } from "./bridge-context";
import { execute } from "./execute";
import { bridgeManager } from "../models/bridge-manager";

export const BridgeProvider = ({ children }: PropsWithChildren) => {
  const queueRef = useRef<Record<string, PendingRequest>>({});

  const addToQueue = useCallback((id: string, pending: PendingRequest) => {
    queueRef.current[id] = pending;
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    const pending = queueRef.current[id];
    if (pending?.timeoutId) {
      clearTimeout(pending.timeoutId);
    }
    delete queueRef.current[id];
  }, []);

  const sendAck = useCallback((id: string) => {
    if (window.ReactNativeWebView) {
      const ackRequest = Request(RequestTypes.ACK, { id });
      window.ReactNativeWebView.postMessage(JSON.stringify(ackRequest));
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        const response = parseBridgeResponse(parsed);
        const { id } = response;

        // If it's a recovery response, handle it specially
        if (response.id === "recovery") {
          const tasks = response.data as BridgeTask[];
          tasks.forEach((task) => {
            if (task.status === "COMPLETED" && task.response) {
              // Emit all recovered responses
              bridgeManager.emit(task.response);
              sendAck(task.id);
            }
          });
          return;
        }

        // Emit every response through the manager
        bridgeManager.emit(response);

        const pending = queueRef.current[id];

        if (!pending) {
          console.warn("No pending request found for id:", id);
          sendAck(id);
          return;
        }

        if (pending.timeoutId) {
          clearTimeout(pending.timeoutId);
        }

        pending.resolve(response);

        removeFromQueue(id);
        sendAck(id);
      } catch (err) {
        console.error("Failed to handle message:", err);
      }
    };

    window.addEventListener("message", handleMessage);

    // Initial recovery request
    if (window.ReactNativeWebView) {
      const recoveryRequest = Request(RequestTypes.RECOVERY, {}, undefined);
      // Give it a special ID so we can recognize the response
      (recoveryRequest as { id: string }).id = "recovery";
      window.ReactNativeWebView.postMessage(JSON.stringify(recoveryRequest));
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [removeFromQueue, sendAck]);

  const executeWithQueue = useCallback(
    function <TResponse = unknown>(
      action: RequestType,
      payload: unknown,
      timeout?: number,
    ): Promise<BridgeResponse<TResponse>> {
      return execute(
        window.ReactNativeWebView,
        addToQueue,
        action,
        payload,
        timeout,
      );
    },
    [addToQueue],
  );

  const value = useMemo(
    () => ({
      bridge: window.ReactNativeWebView,
      execute: executeWithQueue,
      subscribe: (type: string | "ALL", listener: (res: BridgeResponse<unknown>) => void) => 
        bridgeManager.subscribe(type, listener),
    }),
    [executeWithQueue],
  );

  return (
    <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
  );
};

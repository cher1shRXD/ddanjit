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
} from "@ddanjit/bridge-interface";
import { BridgeContext } from "./bridge-context";
import { execute } from "./execute";

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        const response = parseBridgeResponse(parsed);
        const { id } = response;

        const pending = queueRef.current[id];

        if (!pending) {
          console.warn("No pending request found for id:", id);
          return;
        }

        if (pending.timeoutId) {
          clearTimeout(pending.timeoutId);
        }

        pending.resolve(response);

        removeFromQueue(id);
      } catch (err) {
        console.error("Failed to handle message:", err);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [removeFromQueue]);

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
    }),
    [executeWithQueue],
  );

  return (
    <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
  );
};

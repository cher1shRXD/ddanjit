import { useCallback, useMemo } from "react";
import { createBridgeCore } from "../models/BridgeCore";
import { useBridgeUi } from "./useBridgeUi";
import { WebViewBridge } from "../types/webview-bridge";
import { RequestTypes } from "@ddanjit/bridge-interface";
import { useLogin } from "../../features/login";

export const useBridge = () => {
  const { close } = useBridgeUi();
  const { login } = useLogin();

  const bridge = useMemo(() => {
    const core = createBridgeCore();
    core.register(RequestTypes.LOGIN, login);
    return core;
  }, []);

  return useCallback(
    async (raw: string, webview?: WebViewBridge) => {
      const response = await bridge.handleMessage(raw, webview);
      close();
      return response;
    },
    [bridge, close],
  );
};

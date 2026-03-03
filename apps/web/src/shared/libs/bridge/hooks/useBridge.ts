import { useCallback, useContext } from "react";
import { BridgeContext } from "../contexts/bridge-context";

export const useBridge = () => {
  const context = useContext(BridgeContext);
  
  if (!context) {
    throw new Error("useBridge must be used within a BridgeProvider");
  }

  const on = useCallback(<T>(type: string, callback: (data: T) => void) => {
    return context.subscribe(type, (res) => {
      if (res.success) {
        callback(res.data as T);
      }
    });
  }, [context]);

  return {
    execute: context.execute,
    subscribe: context.subscribe,
    on,
  };
};

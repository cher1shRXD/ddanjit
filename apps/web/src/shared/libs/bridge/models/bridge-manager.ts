import type { BridgeResponse } from "@ddanjit/bridge-interface";

type BridgeResponseListener = (response: BridgeResponse<unknown>) => void;

class BridgeManager {
  private listeners: Map<string | "ALL", Set<BridgeResponseListener>> = new Map();
  private handledIds: Set<string> = new Set();

  subscribe(type: string | "ALL", listener: BridgeResponseListener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);
    return () => this.listeners.get(type)?.delete(listener);
  }

  emit(response: BridgeResponse<unknown>) {
    // 중복 수신 방지 (복구 메시지는 예외)
    if (response.id && this.handledIds.has(response.id) && response.id !== "recovery") {
      return;
    }
    if (response.id && response.id !== "recovery") {
      this.handledIds.add(response.id);
      // 메모리 관리를 위해 10초 후 ID 삭제
      setTimeout(() => this.handledIds.delete(response.id), 10000);
    }

    // 전체 리스너 알림
    this.listeners.get("ALL")?.forEach((l) => l(response));
    // 타입별 리스너 알림
    this.listeners.get(response.type)?.forEach((l) => l(response));
  }
}

export const bridgeManager = new BridgeManager();

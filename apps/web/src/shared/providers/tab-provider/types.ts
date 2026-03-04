import type { ReactNode } from "react";

export type TabItem = Record<string, ReactNode>;

export interface ContextType {
  current: string;
  move: (key: string) => void;
}

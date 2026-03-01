import type { ReactNode } from "react";

export interface TabItem {
  key: string;
  component: ReactNode;
}

export interface ContextType {
  current: string;
  move: (key: string) => void;
}
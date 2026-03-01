import { createContext } from "react";
import type { ContextType } from "./types";

export const TabContext = createContext<ContextType | null>(null);
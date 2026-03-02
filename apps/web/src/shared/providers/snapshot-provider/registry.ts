import type { StateValue } from "./types";

export const registry = new Map<string, () => StateValue>();

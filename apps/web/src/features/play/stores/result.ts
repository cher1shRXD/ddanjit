import type { Activity } from "@ddanjit/domain";
import type { InputValue } from "../types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  activity: Activity | null;
  inputs: Record<string, InputValue> | null;
  setResult: (
    activity: Activity | null,
    inputs: Record<string, InputValue> | null,
  ) => void;
}

export const useResultStore = create<State>()(
  persist(
    (set) => ({
      activity: null,
      inputs: null,
      setResult: (activity, inputs) => set({ activity, inputs }),
    }),
    { name: "ddanjit-result" },
  ),
);

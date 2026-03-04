import type { Activity } from "@ddanjit/domain";
import type { InputValue } from "../types";
import { create } from "zustand";

interface State {
  activity: Activity | null;
  inputs: Record<string, InputValue> | null;
  setResult: (
    activity: Activity | null,
    inputs: Record<string, InputValue> | null,
  ) => void;
}

export const useResultStore = create<State>((set) => ({
  activity: null,
  inputs: null,
  setResult: (activity, inputs) => set({ activity, inputs }),
}));

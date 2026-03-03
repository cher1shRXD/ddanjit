import { create } from "zustand";
import { timeOptions } from "../constants/options";
import type { Duration } from "@ddanjit/domain";

interface State {
  time: Duration;
  setTime: (time: Duration) => void;
}

export const useTimeStore = create<State>((set) => ({
  time: timeOptions[0] as Duration,
  setTime: (time) => set({ time }),
}));
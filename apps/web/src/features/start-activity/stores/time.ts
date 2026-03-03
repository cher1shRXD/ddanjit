import { create } from "zustand";
import { timeOptions } from "../constants/options";

interface State {
  time: string;
  setTime: (time: string) => void;
}

export const useTimeStore = create<State>((set) => ({
  time: timeOptions[0],
  setTime: (time) => set({ time }),
}));
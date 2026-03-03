import type { Activity } from "@ddanjit/domain";
import { create } from "zustand";

interface State {
  activity: Activity | null;
  setActivity: (activity: Activity | null) => void;
}

export const useActivityStore = create<State>((set) => ({
  activity: null,
  setActivity: (activity) => set({ activity }),
}));

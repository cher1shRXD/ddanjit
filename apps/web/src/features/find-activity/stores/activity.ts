import type { Activity } from "@ddanjit/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  activity: Activity | null;
  setActivity: (activity: Activity | null) => void;
}

export const useActivityStore = create<State>()(
  persist(
    (set) => ({
      activity: null,
      setActivity: (activity) => set({ activity }),
    }),
    { name: "ddanjit-activity" },
  ),
);

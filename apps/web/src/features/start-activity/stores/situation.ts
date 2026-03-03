import { create } from "zustand";

interface State {
  situation: string;
  setSituation: (situation: string) => void;
}

export const useSituationStore = create<State>((set) => ({
  situation: "",
  setSituation: (situation) => set({ situation }),
}));
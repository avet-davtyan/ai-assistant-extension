import { create } from "zustand";

interface PromptBoxState {
  visible: boolean;
  top: number;
  left: number;
  setPosition: (left: number, top: number) => void;
  show: () => void;
  hide: () => void;
}

export const usePromptBoxStore = create<PromptBoxState>((set) => ({
  visible: false,
  top: 0,
  left: 0,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
  setPosition: (left, top) => set({ left, top }),
}));

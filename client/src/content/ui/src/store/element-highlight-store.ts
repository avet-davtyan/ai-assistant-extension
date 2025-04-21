import { create } from "zustand";

interface ElementHighlightState {
  visible: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
  setPositionAndSize: (left: number, top: number, width: number, height: number) => void;
  show: () => void;
  hide: () => void;
}

export const useElementHighlightStore = create<ElementHighlightState>((set) => ({
  visible: false,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  setPositionAndSize: (left, top, width, height) => set({ left, top, width, height }),
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
}));

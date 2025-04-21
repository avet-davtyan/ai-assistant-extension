import { ElementInfoSchema } from "@ai-assistant/shared";
import { create } from "zustand";

interface ElementInfoState {
  latestElementInfo: ElementInfoSchema | null;
  setLatestElementInfo: (elementInfo: ElementInfoSchema) => void;
}

export const useElementInfoStore = create<ElementInfoState>((set) => ({
  latestElementInfo: null,
  setLatestElementInfo: (elementInfo) => set({ latestElementInfo: elementInfo }),
}));

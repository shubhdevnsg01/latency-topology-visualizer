// stores/uiInteractionStore.ts
import { create } from 'zustand';

export const useUiInteractionStore = create((set) => ({
  isInteractingWithUI: false,
  setIsInteractingWithUI: (value: boolean) => set({ isInteractingWithUI: value }),
}));

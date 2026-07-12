import { create } from 'zustand';

type ViewMode = 'storyboard' | 'canvas';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeState>((set) => ({
  viewMode: 'canvas',
  setViewMode: (newMode) => set({ viewMode: newMode }),
}));

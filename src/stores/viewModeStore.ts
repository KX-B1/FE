import { create } from 'zustand';

type ViewMode = 'storyboard' | 'canvas';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

interface AssetPanelState {
  isPanelOpen: boolean;
  toggleAssetPanel: () => void;
}

export const useViewModeStore = create<ViewModeState & AssetPanelState>(
  (set) => ({
    viewMode: 'storyboard',
    isPanelOpen: true,
    setViewMode: (newMode) => set({ viewMode: newMode }),
    toggleAssetPanel: () =>
      set((state) => ({
        isPanelOpen: !state.isPanelOpen,
      })),
  })
);

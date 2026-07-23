import { create } from 'zustand';

interface CanvasExportState {
  exportFn: (() => void) | null;
  setExportFn: (fn: (() => void) | null) => void;
}

export const useCanvasExportStore = create<CanvasExportState>((set) => ({
  exportFn: null,
  setExportFn: (fn) => set(() => ({ exportFn: fn })),
}));

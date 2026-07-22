import { create } from 'zustand';

interface CanvasNameState {
  canvasName: string;
  setCanvasName: (name: string) => void;
}

export const useCanvasNameStore = create<CanvasNameState>((set) => ({
  canvasName: '',
  setCanvasName: (canvasName) => set({ canvasName }),
}));

import { create } from 'zustand';

interface CanvasNameState {
  canvasName: string;
  setCanvasName: (name: string) => void;
}

export const useCanvasNameStore = create<CanvasNameState>((set) => ({
  canvasName: '프로젝트명을 입력하세요',
  setCanvasName: (canvasName) => set({ canvasName }),
}));

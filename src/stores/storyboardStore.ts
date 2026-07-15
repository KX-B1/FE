import { create } from 'zustand';
import type { Scene } from '@/types/storyboard';

interface StoryboardState {
  scenes: Scene[];
  setScenes: (scenes: Scene[]) => void;
}

export const useStoryboardStore = create<StoryboardState>((set) => ({
  scenes: [],
  setScenes: (scenes) => set({ scenes }),
}));

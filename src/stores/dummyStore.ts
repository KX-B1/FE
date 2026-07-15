// stores/dummyStore.ts
import { create } from 'zustand';
import type { Scene, ShotPrompt } from '@/types/storyboard';

interface DummyState {
  projectName: string;
  shotPrompts: ShotPrompt[];
  scenes: Scene[];
  setProjectName: (projectName: string) => void;
  setShotPrompts: (shotPrompts: ShotPrompt[]) => void;
}

const DUMMY_IMAGE = '/dummyImage.png';

const dummyShotPrompts: ShotPrompt[] = [
  {
    id: 'shot-01',
    shotNumber: '01',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '와이드샷',
    prompt:
      'wide establishing shot of a misty mountain valley at dawn, cinematic lighting, golden hour fog rolling between peaks, anamorphic lens, wide shot',
  },
  {
    id: 'shot-02',
    shotNumber: '02',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '클로즈업',
    prompt:
      "extreme close-up of a character's eyes reflecting neon city lights, shallow depth of field, cinematic color grading",
  },
  {
    id: 'shot-03',
    shotNumber: '03',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '미디엄샷',
    prompt:
      'medium shot of two characters facing each other on a rooftop at night, dramatic rim lighting, tense atmosphere',
  },
  {
    id: 'shot-04',
    shotNumber: '04',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '로우앵글',
    prompt:
      'low angle shot looking up at a towering skyscraper, dramatic perspective, overcast sky, moody color palette',
  },
  {
    id: 'shot-05',
    shotNumber: '05',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '하이앵글',
    prompt:
      'high angle shot of a busy street market from above, bustling crowd, warm afternoon light, documentary style',
  },
  {
    id: 'shot-06',
    shotNumber: '06',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '트래킹샷',
    prompt:
      'tracking shot following a character running through a narrow alley, motion blur, dynamic camera movement, night scene',
  },
  {
    id: 'shot-07',
    shotNumber: '07',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '오버더숄더',
    prompt:
      'over-the-shoulder shot of a character looking at a holographic map, soft blue glow, sci-fi interior, shallow focus',
  },
  {
    id: 'shot-08',
    shotNumber: '08',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '풀샷',
    prompt:
      'full shot of a lone figure standing at the edge of a cliff overlooking the ocean, sunset backlight, epic scale',
  },
  {
    id: 'shot-09',
    shotNumber: '09',
    thumbnailUrl: DUMMY_IMAGE,
    angle: '클로즈업',
    prompt:
      'close-up of hands assembling a mechanical device, warm workshop lighting, shallow depth of field, detailed texture',
  },
];

const dummyScenes: Scene[] = Array.from({ length: 9 }, (_, i) => ({
  id: `scene-${i + 1}`,
  order: i + 1,
  thumbnailUrl: DUMMY_IMAGE,
}));

export const useDummyStore = create<DummyState>((set) => ({
  projectName: '더미 프로젝트명',
  shotPrompts: dummyShotPrompts,
  scenes: dummyScenes,
  setProjectName: (projectName) => set({ projectName }),
  setShotPrompts: (shotPrompts) => set({ shotPrompts }),
}));

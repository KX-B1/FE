'use client';

import dynamic from 'next/dynamic';
import { useViewModeStore } from '@/stores/viewModeStore';
const CanvasArea = dynamic(() => import('@/components/canvas/CanvasArea'), {
  ssr: false,
});
const StoryboardArea = dynamic(
  () => import('@/components/storyboard/StoryboardArea'),
  { ssr: false }
);

// 스토리보드/캔버스 분기 영역
export default function ModeSwitcher() {
  const viewMode = useViewModeStore((state) => state.viewMode);
  return viewMode === 'storyboard' ? <StoryboardArea /> : <CanvasArea />;
}

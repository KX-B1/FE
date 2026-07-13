'use client';

import dynamic from 'next/dynamic';
import { useViewModeStore } from '@/stores/viewModeStore';
const CanvasArea = dynamic(() => import('@/components/canvas/CanvasArea'), {
  ssr: false,
});

// 스토리보드/캔버스 분기 영역
export default function ModeSwitcher() {
  const viewMode = useViewModeStore((state) => state.viewMode);
  return (
    <div>
      <p>테스트</p>
      {viewMode === 'canvas' && <CanvasArea />}
      {/* StoryboardArea 완성되면 아래로 교체
      {viewMode === 'storyboard' ? <StoryboardArea /> : <CanvasArea />}
      */}
    </div>
  );
}

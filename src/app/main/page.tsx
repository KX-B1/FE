'use client';

import AssetSidebar from '@/components/canvas/AssetSidebar';
import Header from '@/components/common/Header';
import ModeSwitcher from '@/components/common/ModeSwitcher';
import { useCanvasExportStore } from '@/stores/canvasExportStore';
import { useViewModeStore } from '@/stores/viewModeStore';

export default function MainPage() {
  const viewMode = useViewModeStore((state) => state.viewMode);
  const canvasExportFn = useCanvasExportStore((state) => state.exportFn);

  const handleSave = () => {
    // TODO: 저장 로직 연결
  };

  const handleExport = (type: 'pdf' | 'png') => {
    // TODO: 내보내기 로직 연결
    if (viewMode === 'canvas' && type === 'png') {
      canvasExportFn?.();
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header variant="project" onSave={handleSave} onExport={handleExport} />
      <div className="flex flex-1">
        <AssetSidebar />
        <ModeSwitcher />
      </div>
    </div>
  );
}

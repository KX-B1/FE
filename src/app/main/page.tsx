'use client';

import AssetSidebar from '@/components/canvas/AssetSidebar';
import ModeSwitcher from '@/components/common/ModeSwitcher';
import ProjectHeader from '@/components/common/ProjectHeader';

export default function MainPage() {
  const handleSave = () => {
    // TODO: 저장 로직 연결
  };

  const handleExport = () => {
    // TODO: 내보내기 로직 연결
  };

  return (
    <div className="flex h-full flex-col">
      <ProjectHeader onSave={handleSave} onExport={handleExport} />
      <div className="flex flex-1 overflow-hidden">
        <AssetSidebar />
        <ModeSwitcher />
      </div>
    </div>
  );
}

'use client';

import AssetSidebar from '@/components/canvas/AssetSidebar';
import Header from '@/components/common/Header';
import ModeSwitcher from '@/components/common/ModeSwitcher';

export default function MainPage() {
  const handleSave = () => {
    // TODO: 저장 로직 연결
  };

  const handleExport = () => {
    // TODO: 내보내기 로직 연결
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

import AssetSidebar from '@/components/canvas/AssetSidebar';
import ModeSwitcher from '@/components/common/ModeSwitcher';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <AssetSidebar />
      <ModeSwitcher />
    </div>
  );
}

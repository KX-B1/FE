'use client';

import Image from 'next/image';
import { useViewModeStore } from '@/stores/viewModeStore';
import PanelToggleButton from '@/components/common/Panel';

interface LogoPanelProps {
  logoSrc?: string;
  onLogoClick?: () => void;
  showPanelToggle?: boolean;
}

export default function LogoPanel({
  logoSrc,
  onLogoClick,
  showPanelToggle = true,
}: LogoPanelProps) {
  const isPanelOpen = useViewModeStore((state) => state.isPanelOpen);
  const toggleAssetPanel = useViewModeStore((state) => state.toggleAssetPanel);

  return (
    <div className="flex items-center gap-15 p-2.5">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-5 cursor-pointer"
      >
        <Image
          src={logoSrc ?? '/logo-wordmark.svg'}
          alt="로고"
          width={200}
          height={50}
        />
      </button>

      {showPanelToggle && (
        <PanelToggleButton isOpen={isPanelOpen} onToggle={toggleAssetPanel} />
      )}
    </div>
  );
}

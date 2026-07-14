'use client';

import { PanelLeft } from 'lucide-react';
import Image from 'next/image';
import { useViewModeStore } from '@/stores/viewModeStore';

export default function LogoPanel() {
  const toggleAssetPanel = useViewModeStore((state) => state.toggleAssetPanel);

  return (
    <div className="flex items-center gap-10 p-2.5">
      <div className="flex items-center gap-5">
        <Image src="/logo.svg" alt="로고" width={40} height={40} />
        <span className="text-[26px] font-bold text-text-primary">LOGO</span>
      </div>

      <button
        type="button"
        onClick={toggleAssetPanel}
        className="text-text-secondary hover:text-text-primary"
      >
        <PanelLeft size={24} />
      </button>
    </div>
  );
}

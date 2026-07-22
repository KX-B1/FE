'use client';

import { useViewModeStore } from '@/stores/viewModeStore';
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';

interface CanvasAsset {
  id: number;
  imageUrl: string;
  file: File;
}

export default function AssetSidebar() {
  const [assets, setAssets] = useState<CanvasAsset[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPanelOpen = useViewModeStore((state) => state.isPanelOpen);

  const handleAssetDragStart = (
    asset: CanvasAsset,
    e: React.DragEvent<HTMLButtonElement>
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        id: asset.id,
        imageUrl: asset.imageUrl,
      })
    );
  };
  if (!isPanelOpen) return null;
  return (
    <aside className="shrink-0 w-[242px] h-full flex flex-col bg-surface border border-border p-5 gap-6">
      <h3 className="text-base text-text-secondary">에셋</h3>
      <section className="flex flex-col gap-3 w-full">
        <h4 className="text-xs text-text-secondary">
          업로드된 이미지 ({assets.length})
        </h4>
        <div className="flex flex-wrap gap-2.5 w-[202px]">
          {assets.map((asset) => (
            <button
              key={asset.id}
              className="relative w-24 h-24 rounded-2xl border border-border flex items-center justify-center shrink-0"
              draggable
              onDragStart={(e) => handleAssetDragStart(asset, e)}
            >
              <img
                src={asset.imageUrl}
                className="w-full h-full object-cover rounded-2xl"
              />
              <img
                src="/canvas-delete-button.svg"
                className="absolute top-1.5 right-1.5 w-3 h-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAssets((prev) => prev.filter((a) => a.id !== asset.id));
                }}
              />
            </button>
          ))}
          <button
            className="w-24 h-24 rounded-2xl  border border-border flex items-center justify-center cursor-pointer"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Plus size={20} className="text-text-placeholder shrink-0" />
          </button>
        </div>
      </section>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const imageUrl = URL.createObjectURL(file);
          setAssets([...assets, { id: Date.now(), imageUrl, file }]);
          e.target.value = '';
        }}
      />
    </aside>
  );
}

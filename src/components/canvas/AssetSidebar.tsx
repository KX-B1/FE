'use client';

import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';

interface CanvasAsset {
  id: number;
  category: 'character' | 'background' | 'prop';
  imageUrl: string;
  file: File;
}

interface PendingSlot {
  category: 'character' | 'background' | 'prop';
}

export default function AssetSidebar() {
  const [assets, setAssets] = useState<CanvasAsset[]>([]);
  const pendingSlotRef = useRef<PendingSlot | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAssetDragStart =
    (asset: CanvasAsset) => (e: React.DragEvent<HTMLButtonElement>) => {
      e.dataTransfer.setData(
        'application/json',
        JSON.stringify({
          id: asset.id,
          category: asset.category,
          imageUrl: asset.imageUrl,
        })
      );
    };

  return (
    <aside className="w-[260px] h-full flex flex-col bg-surface border border-border p-5 gap-6">
      <h3 className="text-base text-text-secondary">에셋</h3>
      <section className="flex flex-col gap-3">
        <h4 className="text-xs text-text-secondary">케릭터 (N)</h4>
        <div className="flex flex-wrap gap-2.5 justify-between">
          {assets
            .filter((asset) => asset.category === 'character')
            .map((asset) => (
              <button
                key={asset.id}
                className="w-24 h-24 rounded-2xl border border-border flex items-center justify-center shrink-0"
                draggable
                onDragStart={handleAssetDragStart(asset)}
              >
                <img
                  src={asset.imageUrl}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </button>
            ))}
          <button
            className="w-24 h-24 rounded-2xl  border border-border flex items-center justify-center cursor-pointer"
            onClick={() => {
              pendingSlotRef.current = { category: 'character' };
              fileInputRef.current?.click();
            }}
          >
            <Plus size={20} className="text-text-placeholder shrink-0" />
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h4 className="text-xs text-text-secondary">배경 (N)</h4>
        <div className="flex flex-wrap gap-2.5 justify-between">
          {assets
            .filter((asset) => asset.category === 'background')
            .map((asset) => (
              <button
                key={asset.id}
                className="w-24 h-24 rounded-2xl border border-border flex items-center justify-center shrink-0"
                draggable
                onDragStart={handleAssetDragStart(asset)}
              >
                <img
                  src={asset.imageUrl}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </button>
            ))}
          <button
            className="w-24 h-24 rounded-2xl  border border-border flex items-center justify-center cursor-pointer"
            onClick={() => {
              pendingSlotRef.current = { category: 'background' };
              fileInputRef.current?.click();
            }}
          >
            <Plus size={20} className="text-text-placeholder shrink-0" />
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h4 className="text-xs text-text-secondary">소품 (N)</h4>
        <div className="flex flex-wrap gap-2.5 justify-between">
          {assets
            .filter((asset) => asset.category === 'prop')
            .map((asset) => (
              <button
                key={asset.id}
                className="w-24 h-24 rounded-2xl border border-border flex items-center justify-center shrink-0"
                draggable
                onDragStart={handleAssetDragStart(asset)}
              >
                <img
                  src={asset.imageUrl}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </button>
            ))}
          <button
            className="w-24 h-24 rounded-2xl border border-border flex items-center justify-center cursor-pointer"
            onClick={() => {
              pendingSlotRef.current = { category: 'prop' };
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
          const category = pendingSlotRef.current?.category;
          if (!category) return;
          const imageUrl = URL.createObjectURL(file);
          setAssets([...assets, { id: Date.now(), category, imageUrl, file }]);
        }}
      />
    </aside>
  );
}

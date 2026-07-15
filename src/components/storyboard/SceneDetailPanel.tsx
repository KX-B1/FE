'use client';

import SceneCard from './SceneCard';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import type { SceneDetailPanelProps } from '@/types/storyboard';

export default function SceneDetailPanel({
  shotPrompts,
}: SceneDetailPanelProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopyAll = () => {
    const text = shotPrompts
      .map((shot) => `shot ${shot.shotNumber} (${shot.angle}): ${shot.prompt}`)
      .join('\n\n');

    copy(text);
  };

  return (
    <div className="flex flex-col gap-2.5 p-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-base p-2.5 font-medium text-text-primary">
          샷 프롬프트
        </h2>
        <button
          type="button"
          onClick={handleCopyAll}
          disabled={copied}
          className={`shrink-0 rounded-full px-5 py-2.5 text-base transition-colors ${
            copied
              ? 'border-transparent bg-linear-to-r from-primary-500 to-primary-700 text-text-primary'
              : 'border border-border text-text-primary hover:bg-border/50'
          }`}
        >
          {copied ? '복사됨' : '모두 복사하기'}
        </button>
      </div>

      <div className="flex flex-col gap-2.5 p-2.5">
        {shotPrompts.map((shot) => (
          <SceneCard
            key={shot.id}
            shotNumber={shot.shotNumber}
            thumbnailUrl={shot.thumbnailUrl}
            angle={shot.angle}
            prompt={shot.prompt}
          />
        ))}
      </div>
    </div>
  );
}

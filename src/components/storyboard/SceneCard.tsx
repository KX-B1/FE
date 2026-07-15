'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import type { SceneCardProps } from '@/types/storyboard';

export default function SceneCard({
  shotNumber,
  thumbnailUrl,
  angle,
  prompt,
}: SceneCardProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => copy(prompt);

  return (
    <div className="flex items-center gap-10 rounded-[20px] border border-border bg-surface px-5 py-2.5">
      <div className="relative flex h-25 w-40.5 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-surface">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`shot ${shotNumber}`}
            fill
            sizes="162px"
            className="object-cover"
          />
        ) : (
          <ImageIcon size={18} className="text-text-placeholder" />
        )}

        <span className="absolute inset-y-0 left-4 flex flex-col font-bold justify-center py-4 leading-[1.15] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span className="text-xl">shot</span>
          <span className="text-2xl">{shotNumber}</span>
        </span>
      </div>

      <span className="w-fit shrink-0 rounded-full border border-primary-600 px-2.5 py-1.5 text-sm text-primary-600">
        {angle}
      </span>

      <p className="flex-1 text-base text-text-primary">{prompt}</p>

      <button
        type="button"
        onClick={handleCopy}
        disabled={copied}
        className={`shrink-0 rounded-full px-5 py-2.5 text-base transition-colors ${
          copied
            ? 'border-transparent bg-linear-to-r from-primary-500 to-primary-700 text-text-primary'
            : 'border border-border text-text-primary hover:bg-border/50'
        }`}
      >
        {copied ? '복사됨' : '복사하기'}
      </button>
    </div>
  );
}

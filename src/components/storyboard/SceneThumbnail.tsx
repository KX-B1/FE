'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { SceneThumbnailProps } from '@/types/storyboard';

export default function SceneThumbnail({ src, alt }: SceneThumbnailProps) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-card">
      {src ? (
        <Image
          src={src}
          alt={alt ?? '씬 미리보기'}
          fill
          className="object-cover"
        />
      ) : (
        <ImageIcon size={20} className="text-text-placeholder" />
      )}
    </div>
  );
}

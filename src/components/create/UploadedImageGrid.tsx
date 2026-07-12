'use client';

import { MAX_IMAGE_COUNT, type UploadedImage } from '@/types/create';
import Image from 'next/image';

interface UploadedImageGridProps {
  images: UploadedImage[];
  maxCount?: number;
  onAddClick: () => void;
  onRemove: (id: string) => void;
}

export default function UploadedImageGrid({
  images,
  maxCount = MAX_IMAGE_COUNT,
  onAddClick,
  onRemove,
}: UploadedImageGridProps) {
  const canAddMore = images.length < maxCount;
  // 이미지가 없을 땐 3칸의 추가 버튼
  // 1개 있을 땐 2칸만
  // 이외엔 1칸 (추후 수정)
  const emptySlotCount =
    images.length === 0 ? 3 : images.length === 1 ? 2 : canAddMore ? 1 : 0;

  return (
    <div>
      <p className="px-2.5 pb-2 text-sm font-medium text-text-placeholder">
        업로드한 이미지{' '}
        <span className="text-text-placeholder">
          ({images.length}/{maxCount})
        </span>
      </p>
      <div className="grid grid-cols-3 gap-3.5 lg:p-2.5">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.previewUrl}
              alt="업로드한 레퍼런스 이미지"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(image.id)}
              className="absolute right-1 top-1 hidden h-10 w-10 items-center justify-center rounded-full bg-overlay text-2xl text-text-primary group-hover:flex"
              aria-label="이미지 삭제"
            >
              ×
            </button>
          </div>
        ))}
        {Array.from({ length: emptySlotCount }).map((_, i) => (
          <button
            key={`empty-${i}`}
            type="button"
            onClick={onAddClick}
            className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-surface text-text-secondary transition-colors hover:border-primary-500 hover:text-primary-500"
            aria-label="이미지 추가"
          >
            <Image src="/plus.svg" alt="사진 추가" width={36} height={36} />
          </button>
        ))}
      </div>
    </div>
  );
}

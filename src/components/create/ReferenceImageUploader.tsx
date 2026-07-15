'use client';

import Image from 'next/image';
import { MAX_IMAGE_COUNT } from '@/types/create';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ChangeEvent,
  type DragEvent,
} from 'react';

export interface ReferenceImageUploaderHandle {
  openFileDialog: () => void;
}

interface ReferenceImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxCount?: number;
  accept?: string;
}

const ReferenceImageUploader = forwardRef<
  ReferenceImageUploaderHandle,
  ReferenceImageUploaderProps
>(function ReferenceImageUploader(
  {
    onFilesSelected,
    maxCount = MAX_IMAGE_COUNT,
    accept = 'image/png,image/jpeg,image/webp',
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    openFileDialog: () => inputRef.current?.click(),
  }));

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(Array.from(fileList));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <p className="px-2.5 pb-2 text-sm text-text-secondary">
        레퍼런스 이미지 업로드
      </p>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
        className="flex h-55 cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px] border border-border bg-surface transition-colors hover:border-primary-500"
      >
        <Image src="/upload.svg" alt="업로드" width={30} height={30} />

        <p className="text-sm text-text-secondary">
          클릭하여 이미지를 업로드하세요
        </p>
        <p className="text-[10px] text-text-placeholder">
          PNG, JPG, WEBP · 최대 {maxCount}개
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
});

export default ReferenceImageUploader;

'use client';

import { useState } from 'react';
import {
  MAX_GENRE_COUNT,
  MAX_IMAGE_COUNT,
  MIN_SCENARIO_LENGTH,
  type Genre,
  type UploadedImage,
} from '@/types/create';

export function useStoryboardForm() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [scenario, setScenario] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGenre = (genre: Genre) => {
    setGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((item) => item !== genre);
      }
      if (prev.length >= MAX_GENRE_COUNT) return prev;
      return [...prev, genre];
    });
  };

  const addImages = (files: File[]) => {
    const remainingSlots = MAX_IMAGE_COUNT - images.length;
    if (remainingSlots <= 0) return;

    const nextImages: UploadedImage[] = files
      .slice(0, remainingSlots)
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...nextImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((image) => image.id !== id);
    });
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: lib/api.ts의 스토리보드 생성 API 연동
      // await createStoryboard({ images, scenario, genres });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    images.length === 0 || scenario.trim().length < MIN_SCENARIO_LENGTH;

  return {
    images,
    scenario,
    genres,
    isSubmitting,
    isSubmitDisabled,
    setScenario,
    toggleGenre,
    addImages,
    removeImage,
    submit,
  };
}

export const GENRES = [
  '로맨스',
  '드라마',
  '스릴러',
  '코미디',
  '액션',
  '호러',
  'Sci-Fi',
  '판타지',
  '미스터리',
] as const;

export type Genre = (typeof GENRES)[number];

export const MAX_IMAGE_COUNT = 10;
export const MIN_SCENARIO_LENGTH = 10;
export const MAX_SCENARIO_LENGTH = 3000;
export const MAX_GENRE_COUNT = 3;

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
}

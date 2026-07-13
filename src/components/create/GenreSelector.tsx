'use client';

import { GENRES, MAX_GENRE_COUNT, type Genre } from '@/types/create';

interface GenreSelectorProps {
  selected: Genre[];
  onSelect: (genre: Genre) => void;
}

export default function GenreSelector({
  selected,
  onSelect,
}: GenreSelectorProps) {
  const isFull = selected.length >= MAX_GENRE_COUNT;

  return (
    <div className="p-2.5">
      <div className="pb-2 px-2.5 flex items-center gap-4">
        <p className="text-sm text-text-secondary">장르 선택</p>
        {isFull && (
          <span className="text-[10px] text-primary-500">
            장르는 최대 {MAX_GENRE_COUNT}개까지 선택할 수 있습니다.
          </span>
        )}
      </div>
      <div className="p-2.5 flex flex-wrap gap-2">
        {GENRES.map((genre) => {
          const isActive = selected.includes(genre);
          const isDisabled = !isActive && selected.length >= MAX_GENRE_COUNT;
          return (
            <button
              key={genre}
              type="button"
              aria-pressed={isActive}
              disabled={isDisabled}
              onClick={() => onSelect(genre)}
              className={`rounded-full border py-2.5 px-4 text-xs ${
                isActive
                  ? 'border-primary-600 text-primary-600'
                  : 'border-border text-text-secondary transition-colors hover:border-primary-50 hover:text-text-primary disabled:hover:border-border disabled:hover:text-text-secondary'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}

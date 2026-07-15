'use client';

import SceneThumbnail from './SceneThumbnail';
import type { SceneListProps } from '@/types/storyboard';

export default function SceneList({ scenes }: SceneListProps) {
  return (
    <div className="flex flex-col gap-7.5 px-2.5">
      <h2 className="text-base font-medium text-text-primary">
        9컷 스토리보드
      </h2>
      <div className="grid grid-cols-3 gap-2.5">
        {scenes.map((scene) => (
          <SceneThumbnail
            key={scene.id}
            src={scene.thumbnailUrl}
            alt={`scene ${scene.order}`}
          />
        ))}
      </div>
    </div>
  );
}

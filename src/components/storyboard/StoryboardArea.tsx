'use client';

import ProjectName from '@/components/common/ProjectName';
import SceneList from './SceneList';
import SceneDetailPanel from './SceneDetailPanel';
import { useDummyStore } from '@/stores/dummyStore';

export default function StoryboardArea() {
  const scenes = useDummyStore((state) => state.scenes);
  const shotPrompts = useDummyStore((state) => state.shotPrompts);

  return (
    <div className="flex h-screen w-full flex-col p-8 gap-6 overflow-y-auto bg-background">
      <ProjectName />
      <SceneList scenes={scenes} />
      <SceneDetailPanel shotPrompts={shotPrompts} />
    </div>
  );
}

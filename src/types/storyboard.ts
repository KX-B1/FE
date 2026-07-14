export interface Scene {
  id: string;
  order: number;
  thumbnailUrl?: string;
}

export interface ShotPrompt {
  id: string;
  shotNumber: string;
  thumbnailUrl?: string;
  angle: string;
  prompt: string;
}

export interface SceneCardProps {
  shotNumber: string;
  thumbnailUrl?: string;
  angle: string;
  prompt: string;
}

export interface SceneDetailPanelProps {
  shotPrompts: ShotPrompt[];
}

export interface SceneListProps {
  scenes: Scene[];
}

export interface SceneThumbnailProps {
  src?: string;
  alt?: string;
}

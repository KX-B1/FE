'use client';

import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { useViewModeStore } from '@/stores/viewModeStore';
import LogoPanel from './LogoPanel';
import ExportDropdown from '@/components/common/ExportDropdown';

interface ProjectHeaderProps {
  onSave?: () => void;
  onExport?: (type: 'pdf' | 'png') => void;
}

export default function ProjectHeader({
  onSave,
  onExport,
}: ProjectHeaderProps) {
  const viewMode = useViewModeStore((state) => state.viewMode);
  const setViewMode = useViewModeStore((state) => state.setViewMode);

  const storyboardRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeRef = viewMode === 'storyboard' ? storyboardRef : canvasRef;
    if (activeRef.current) {
      setIndicator({
        left: activeRef.current.offsetLeft,
        width: activeRef.current.offsetWidth,
      });
    }
  }, [viewMode]);

  return (
    <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-1.5">
      <div className="flex items-center gap-12">
        <LogoPanel />

        <div className="relative flex items-center gap-10 p-2.5">
          <button
            ref={storyboardRef}
            type="button"
            onClick={() => setViewMode('storyboard')}
            className={`text-base font-medium leading-11 transition-colors duration-200 ${
              viewMode === 'storyboard'
                ? 'text-primary-500'
                : 'text-text-primary'
            }`}
          >
            스토리보드
          </button>
          <button
            ref={canvasRef}
            type="button"
            onClick={() => setViewMode('canvas')}
            className={`text-base font-medium leading-11 transition-colors duration-200 ${
              viewMode === 'canvas' ? 'text-primary-500' : 'text-text-primary'
            }`}
          >
            캔버스
          </button>

          <span
            className="absolute bottom-2.5 h-0.75 bg-primary-500 transition-all duration-200 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 px-2.5">
        <button
          type="button"
          onClick={onSave}
          className="rounded-full border border-border px-5 py-2.5 text-base font-medium text-text-primary hover:bg-surface"
        >
          저장하기
        </button>
        <ExportDropdown onExport={onExport} />
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary"
        >
          <User size={18} />
        </button>
      </div>
    </div>
  );
}

'use client';

import { User } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useViewModeStore } from '@/stores/viewModeStore';
import LogoPanel from './LogoPanel';
import ExportDropdown from '@/components/common/ExportDropdown';
import type { HeaderProps } from '@/types/common';

export default function Header(props: HeaderProps) {
  const isProject = props.variant === 'project';

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-1.5">
      <div className="flex items-center gap-12">
        <LogoPanel
          logoSrc={!isProject ? props.logoSrc : undefined}
          onLogoClick={!isProject ? props.onLogoClick : undefined}
          showPanelToggle={isProject}
        />
        {isProject && <ModeSwitcherTabs />}
      </div>
      <div className="flex items-center gap-5 px-2.5">
        {!isProject && (
          <span className="text-text-primary text-sm">
            {props.userId ?? 'ID'}
          </span>
        )}

        {isProject && (
          <>
            <button
              type="button"
              onClick={props.onSave}
              className="rounded-full border border-border px-5 py-2.5 text-base font-medium text-text-primary hover:bg-background cursor-pointer"
            >
              저장하기
            </button>
            <ExportDropdown onExport={props.onExport} />
          </>
        )}

        <button
          onClick={props.onProfileClick}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background cursor-pointer"
        >
          <User size={16} className="text-text-secondary" />
        </button>
      </div>
    </header>
  );
}

function ModeSwitcherTabs() {
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
    <div className="relative flex items-center gap-10 p-2.5">
      <button
        ref={storyboardRef}
        type="button"
        onClick={() => setViewMode('storyboard')}
        className={`text-base font-medium leading-11 transition-colors duration-200 cursor-pointer ${
          viewMode === 'storyboard' ? 'text-primary-500' : 'text-text-primary'
        }`}
      >
        스토리보드
      </button>
      <button
        ref={canvasRef}
        type="button"
        onClick={() => setViewMode('canvas')}
        className={`text-base font-medium leading-11 transition-colors duration-200 cursor-pointer ${
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
  );
}

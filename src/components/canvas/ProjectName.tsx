'use client';

import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useCanvasNameStore } from '@/stores/canvasStore';
import { Pencil } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectName() {
  const canvasName = useCanvasNameStore((state) => state.canvasName);
  const setCanvasName = useCanvasNameStore((state) => state.setCanvasName);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const monthStr = month.toString().padStart(2, '0');
  const dateStr = date.toString().padStart(2, '0');
  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');
  const defaultName = `Storyboard ${year}.${monthStr}.${dateStr} ${hourStr}.${minuteStr}`;

  const handleCommit = () => {
    if (draftName.trim() === '') setCanvasName(defaultName);
    commitEdit();
  };
  useEffect(() => {
    if (canvasName === '') setCanvasName(defaultName);
  }, []);

  const {
    isEditing,
    draft: draftName,
    inputRef,
    setDraft: setDraftName,
    startEditing,
    commit: commitEdit,
    cancel: cancelEdit,
  } = useInlineEdit(canvasName, setCanvasName);

  return (
    <div className="flex items-center px-2.5">
      {isEditing ? (
        <>
          <input
            maxLength={30}
            ref={inputRef}
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommit();
              if (e.key === 'Escape') cancelEdit();
            }}
            style={{ fieldSizing: 'content' } as React.CSSProperties}
            className="min-w-10 max-w-100 rounded-md border border-primary-500 bg-transparent text-xl font-medium text-text-primary outline-none"
          />
          <span>{draftName.length}/30</span>
        </>
      ) : (
        <>
          <h1
            className={`text-xl font-medium ${canvasName === '' ? 'text-text-placeholder' : 'text-text-primary'}`}
          >
            {canvasName || defaultName}
          </h1>
          <button
            type="button"
            onClick={startEditing}
            className="text-text-primary hover:text-primary-500 pl-1"
          >
            <Pencil size={20} />
          </button>
        </>
      )}
    </div>
  );
}

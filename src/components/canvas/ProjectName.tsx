'use client';

import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useCanvasNameStore } from '@/stores/canvasStore';
import { Pencil } from 'lucide-react';

export default function ProjectName() {
  const canvasName = useCanvasNameStore((state) => state.canvasName);
  const setCanvasName = useCanvasNameStore((state) => state.setCanvasName);

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
        <input
          ref={inputRef}
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
          className="min-w-10 max-w-100 rounded-md border border-primary-500 bg-transparent text-xl font-medium text-text-primary outline-none"
        />
      ) : (
        <>
          <h1
            className={`text-xl font-medium ${canvasName === '' ? 'text-text-placeholder' : 'text-text-primary'}`}
          >
            {canvasName || '프로젝트명을 입력하세요.'}
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

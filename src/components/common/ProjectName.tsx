'use client';

import { Pencil } from 'lucide-react';
import { useDummyStore } from '@/stores/dummyStore';
import { useInlineEdit } from '@/hooks/useInlineEdit';

export default function ProjectName() {
  const projectName = useDummyStore((state) => state.projectName);
  const setProjectName = useDummyStore((state) => state.setProjectName);

  const {
    isEditing,
    draft: draftName,
    inputRef,
    setDraft: setDraftName,
    startEditing,
    commit: commitEdit,
    cancel: cancelEdit,
  } = useInlineEdit(projectName, setProjectName);

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
          <h1 className="text-xl font-medium text-text-primary">
            {projectName}
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

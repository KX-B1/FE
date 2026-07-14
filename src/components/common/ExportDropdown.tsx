'use client';

import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { ExportDropdownProps } from '@/types/common';

export default function ExportDropdown({ onExport }: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleExport = (type: 'pdf' | 'png') => {
    setIsOpen(false);
    onExport?.(type);
  };

  const exportButtonClass =
    'relative z-10 w-full whitespace-nowrap rounded-[10px] px-6 py-3 text-center text-xs font-medium transition-colors hover:bg-text-disabled/50';

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-full bg-secondary-400 py-2.5 pl-7.5 pr-5 text-base font-medium text-card"
      >
        내보내기
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-35 rounded-2xl border border-border bg-surface p-1.5 shadow-lg">
          <div className="relative">
            <div className="absolute top-1/2 right-2 left-2 h-px -translate-y-1/2 bg-border" />

            <button
              type="button"
              onClick={() => handleExport('pdf')}
              className={exportButtonClass}
            >
              PDF로 내보내기
            </button>

            <button
              type="button"
              onClick={() => handleExport('png')}
              className={exportButtonClass}
            >
              PNG로 내보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

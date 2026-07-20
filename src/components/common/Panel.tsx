'use client';

import { PanelLeft, PanelRight } from 'lucide-react';

interface PanelToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  size?: number;
}

export default function PanelToggleButton({
  isOpen,
  onToggle,
  size = 24,
}: PanelToggleButtonProps) {
  const Icon = isOpen ? PanelLeft : PanelRight;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? '패널 닫기' : '패널 열기'}
      aria-pressed={isOpen}
      className="text-text-secondary hover:text-text-primary cursor-pointer"
    >
      <Icon size={size} />
    </button>
  );
}

import { ButtonProps } from '@/types/common';

export default function Button({
  children,
  type = 'button',
  onClick,
  inactive,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-90 h-13 flex items-center justify-center rounded-[20px] text-base transition ${
        inactive
          ? 'bg-surface border border-border text-text-primary'
          : 'bg-linear-to-br from-primary-500 to-primary-700 text-text-primary hover:opacity-80'
      }`}
    >
      {children}
    </button>
  );
}

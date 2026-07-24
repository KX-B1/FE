import { ButtonProps } from '@/types/auth';

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
      className={`w-full max-w-90 h-13 flex items-center justify-center rounded-[20px] text-base transition ${
        inactive
          ? 'bg-surface border border-border text-text-primary'
          : 'bg-linear-to-br from-primary-300 to-primary-500 to-80% text-text-primary hover:opacity-80 cursor-pointer'
      }`}
    >
      {children}
    </button>
  );
}

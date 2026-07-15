'use client';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function GenerateButton({
  onClick,
  disabled,
  isLoading,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="rounded-[20px] font-medium bg-secondary-400 px-6 py-3.5 text-sm text-background transition-opacity hover:opacity-80"
    >
      {isLoading ? '생성 중...' : '스토리보드 생성하기'}
    </button>
  );
}

import Image from 'next/image';

interface GoogleButtonProps {
  onClick?: () => void;
  mode?: 'signup' | 'login';
  label?: string;
}

const DEFAULT_LABELS: Record<NonNullable<GoogleButtonProps['mode']>, string> = {
  signup: 'Google로 회원가입',
  login: 'Google로 로그인',
};

export default function GoogleButton({
  onClick,
  mode = 'signup',
  label,
}: GoogleButtonProps) {
  const displayLabel = label ?? DEFAULT_LABELS[mode];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-13 w-90 items-center justify-center gap-2.5 rounded-[10px] bg-white text-base font-medium text-surface transition hover:opacity-90"
    >
      <Image src="/google.svg" alt="로고" width={18} height={19} />

      {displayLabel}
    </button>
  );
}

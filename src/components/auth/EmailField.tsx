import Image from 'next/image';
import type { VerificationStatus } from '@/types/auth';

interface EmailFieldProps {
  email: string;
  onEmailChange: (value: string) => void;
  onRequestCode: () => void;
  canRequestCode: boolean;
  isEmailVerified: boolean;
  status: VerificationStatus;
  timeLeft: number;
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  error: string | null;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function EmailField({
  email,
  onEmailChange,
  onRequestCode,
  canRequestCode,
  isEmailVerified,
  status,
  timeLeft,
  code,
  onCodeChange,
  onVerify,
  error,
}: EmailFieldProps) {
  const showCodeSection = status !== 'idle' && status !== 'verified';
  const isExpired = status === 'expired';

  return (
    <div className="flex flex-col gap-2">
      <label className="px-5 text-sm text-text-primary">이메일</label>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={isEmailVerified}
          className="h-13 flex-1 rounded-[10px] border border-border bg-surface px-5 text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary-500 focus:shadow-[0_0_2px_2px] focus:shadow-primary-500/30 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={onRequestCode}
          disabled={!canRequestCode}
          className={`h-13 w-28 shrink-0 rounded-[10px] text-sm transition ${
            status === 'sent' || status === 'verifying'
              ? 'bg-linear-to-br from-primary-500 to-primary-700 text-text-primary'
              : isEmailVerified
                ? 'bg-linear-to-br from-primary-500 to-primary-700 text-text-primary opacity-60'
                : 'border border-primary-500 text-primary-500 disabled:border-border disabled:text-text-disabled'
          }`}
        >
          {isEmailVerified
            ? '인증완료'
            : status === 'sent' || status === 'verifying'
              ? '인증번호 발송'
              : status === 'expired'
                ? '다시 받기'
                : '인증번호 받기'}
        </button>
      </div>

      {showCodeSection && (
        <>
          <div className="flex items-center justify-between px-5 pt-3">
            <label className="text-sm text-text-secondary">인증번호</label>
            {!isExpired && (
              <span className="flex items-center gap-1 text-xs text-text-placeholder">
                <Image src="/check.svg" alt="발송 완료" width={12} height={12} />
                이메일로 발송되었습니다
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                placeholder="인증번호 6자리를 입력하세요"
                disabled={isExpired}
                maxLength={6}
                className="h-13 w-full rounded-[10px] border border-border bg-surface px-5 pr-14 text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary-500 focus:shadow-[0_0_2px_2px] focus:shadow-primary-500/30 disabled:opacity-50"
              />
              {!isExpired && (
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-text-placeholder">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onVerify}
              disabled={isExpired || code.length < 6 || status === 'verifying'}
              className={`h-13 w-28 shrink-0 rounded-[10px] text-sm transition ${
                code.length >= 6 && !isExpired
                  ? 'bg-linear-to-br from-primary-500 to-primary-700 text-text-primary hover:opacity-80'
                  : 'border border-primary-500 text-primary-400 disabled:border-border disabled:text-text-disabled'
              }`}
            >
              인증하기
            </button>
          </div>

          {isExpired && (
            <p className="px-5 text-xs text-status-error">
              인증번호가 만료되었습니다. 다시 받아주세요.
            </p>
          )}
        </>
      )}

      {error && <p className="px-5 text-xs text-status-error">{error}</p>}
    </div>
  );
}

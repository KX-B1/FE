import Image from 'next/image';
import { OTP_LENGTH, type EmailFieldProps } from '@/types/auth';
import { formatTime } from '@/lib/format';

export default function EmailField({
  email,
  onEmailChange,
  onRequestCode,
  canRequestCode,
  isEmailVerified,
  status,
  resendCooldown,
  code,
  onCodeChange,
  onVerify,
  error,
}: EmailFieldProps) {
  // 가입된 이메일일시 에러 표시
  const showCodeSection = status === 'sent' || status === 'verifying';
  const inCooldown = resendCooldown > 0;

  const requestLabel = isEmailVerified
    ? '인증완료'
    : status === 'sending'
      ? '발송 중...'
      : inCooldown
        ? '발송완료'
        : status === 'idle'
          ? '인증번호 받기'
          : '다시 받기';

  return (
    <div className="flex flex-col gap-2">
      <label className="px-5 text-sm text-text-secondary">이메일</label>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={isEmailVerified}
          autoComplete="off"
          className="h-13 min-w-0 flex-1 rounded-[10px] border border-border bg-background px-5 text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary-500 disabled:text-text-secondary"
        />
        <button
          type="button"
          onClick={onRequestCode}
          disabled={!canRequestCode}
          className={`h-13 w-28 shrink-0 appearance-none rounded-[10px] text-sm transition ${
            canRequestCode
              ? 'bg-linear-to-br from-primary-300 to-primary-500 to-80% text-text-primary hover:opacity-80 cursor-pointer'
              : isEmailVerified || inCooldown
                ? 'bg-linear-to-br from-primary-300 to-primary-500 to-80% text-text-primary'
                : status === 'idle'
                  ? 'bg-background border border-primary-300 text-primary-300'
                  : 'bg-surface border border-border text-text-primary'
          }`}
        >
          {requestLabel}
        </button>
      </div>

      {showCodeSection && (
        <>
          <div className="flex items-center justify-between px-5 pt-3">
            <label className="text-sm text-text-secondary">인증번호</label>
            <span className="flex items-center gap-1 text-xs text-text-placeholder">
              <Image src="/check.svg" alt="발송 완료" width={12} height={12} />
              이메일로 발송되었습니다
            </span>
          </div>

          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <input
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                placeholder={`인증번호 ${OTP_LENGTH}자리를 입력하세요`}
                className="h-13 w-full rounded-[10px] border border-border bg-background px-5 text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary-500"
              />
              {inCooldown && (
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-text-placeholder">
                  {formatTime(resendCooldown)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onVerify}
              disabled={code.length < OTP_LENGTH || status === 'verifying'}
              className={`h-13 w-28 shrink-0 rounded-[10px] text-sm transition ${
                code.length >= OTP_LENGTH && status !== 'verifying'
                  ? 'bg-linear-to-br from-primary-300 to-primary-500 to-80% text-text-primary hover:opacity-80 cursor-pointer'
                  : 'bg-background border border-primary-300 text-primary-300'
              }`}
            >
              인증하기
            </button>
          </div>
        </>
      )}

      {error && <p className="px-5 text-xs text-status-error">{error}</p>}
    </div>
  );
}

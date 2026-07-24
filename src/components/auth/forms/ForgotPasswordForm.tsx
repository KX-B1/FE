'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Lock } from 'lucide-react';
import Input from '@/components/auth/ui/Input';
import Button from '@/components/auth/ui/Button';
import OtpInput from '@/components/auth/ui/OtpInput';
import { useEmailField } from '@/hooks/useEmailField';
import { usePasswordField } from '@/hooks/usePasswordField';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { OTP_LENGTH } from '@/types/auth';
import { resetPassword } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';
import { formatTime } from '@/lib/format';

type Step = 'email' | 'code' | 'reset' | 'done';

function StepHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-7.5">
      <div className="flex size-16 items-center justify-center rounded-full border-[0.8px] border-primary-500 bg-linear-to-br from-primary-500/20 to-primary-700/20">
        {icon}
      </div>
      <h1 className="text-center text-xl text-text-primary">{title}</h1>
      <p className="text-center text-sm text-text-placeholder">{description}</p>
    </div>
  );
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const {
    email,
    error: emailError,
    validate: validateEmail,
    handleChange: handleEmailChange,
  } = useEmailField();
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    passwordConfirmError,
    handlePasswordConfirmBlur,
    isValid: isPasswordSectionValid,
  } = usePasswordField();

  const {
    status: verificationStatus,
    resendCooldown,
    code,
    error: verificationError,
    setCode,
    requestCode,
    verifyCode,
  } = useEmailVerification(email, { type: 'recovery' });

  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // 코드가 다 채워지면 자동으로 인증 시도
  const lastAttemptedCodeRef = useRef('');
  useEffect(() => {
    if (
      step !== 'code' ||
      verificationStatus !== 'sent' ||
      code.length !== OTP_LENGTH ||
      lastAttemptedCodeRef.current === code
    ) {
      return;
    }
    lastAttemptedCodeRef.current = code;
    verifyCode().then((ok) => {
      if (ok) setStep('reset');
    });
  }, [step, verificationStatus, code, verifyCode]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verificationStatus === 'sending' || !validateEmail(email)) return;
    const ok = await requestCode();
    if (ok) setStep('code');
  };

  const canSubmitPassword = isPasswordSectionValid && !isSubmitting;

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmitPassword) return;
    setIsSubmitting(true);
    setSubmitError('');
    setPasswordError('');
    try {
      await resetPassword(password);
      setStep('done');
    } catch (err) {
      const isSamePasswordError =
        err instanceof ApiError &&
        (err.code === 'SAME_AS_OLD_PASSWORD' ||
          /different from the old password/i.test(err.message));
      if (isSamePasswordError) {
        setPasswordError(
          '이전 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.'
        );
      } else {
        setSubmitError(
          err instanceof ApiError
            ? err.message
            : '비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'email') {
    return (
      <>
        <StepHeader
          icon={<Lock size={24} className="text-primary-500" />}
          title="비밀번호 찾기"
          description={
            <>
              가입하신 이메일 주소를 입력해주세요
              <br />
              {OTP_LENGTH}자리 인증 코드를 보내드리겠습니다
            </>
          }
        />
        <form
          onSubmit={handleEmailSubmit}
          className="w-full max-w-95 flex flex-col items-center gap-7.5"
        >
          <div className="w-full">
            <Input
              label="이메일"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              error={
                emailError ||
                (verificationStatus === 'error'
                  ? (verificationError ?? undefined)
                  : undefined)
              }
              focusShadow={false}
            />
          </div>

          <div className="flex w-full flex-col items-center gap-7.5 p-2.5">
            <Button
              type="submit"
              inactive={email.trim() === '' || verificationStatus === 'sending'}
            >
              {verificationStatus === 'sending'
                ? '전송 중...'
                : '인증코드 보내기'}
            </Button>
            <Link
              href="/login"
              className="text-sm text-primary-300 hover:underline"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </form>
      </>
    );
  }

  if (step === 'code') {
    const inCooldown = resendCooldown > 0;
    const isBusy = verificationStatus === 'verifying';
    return (
      <>
        <StepHeader
          icon={<Check size={24} className="text-primary-500" />}
          title="코드를 전송했습니다"
          description={
            <>
              <span className="inline-block text-primary-300 pb-2.5">
                {email}
              </span>
              <br />
              입력하신 이메일로 {OTP_LENGTH}자리 인증 코드를 보냈습니다
              <br />
              메일이 보이지 않는다면 스팸함을 확인해주세요
            </>
          }
        />
        <div className="w-full max-w-95 flex flex-col items-center gap-7.5">
          <div className="flex w-full flex-col items-center gap-4">
            <OtpInput
              length={OTP_LENGTH}
              value={code}
              onChange={setCode}
              disabled={isBusy}
              error={!!verificationError}
            />
            {verificationError && (
              <p className="text-xs text-status-error">{verificationError}</p>
            )}
            {inCooldown && (
              <p className="text-xs text-text-placeholder">
                {formatTime(resendCooldown)}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col items-center gap-7.5 p-2.5">
            <Button
              type="button"
              onClick={requestCode}
              inactive={
                inCooldown || verificationStatus === 'sending' || isBusy
              }
            >
              {verificationStatus === 'sending' ? '전송 중...' : '다시 보내기'}
            </Button>
            <Link
              href="/login"
              className="text-sm text-primary-300 hover:underline"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (step === 'reset') {
    return (
      <>
        <StepHeader
          icon={<Lock size={24} className="text-primary-500" />}
          title="새 비밀번호 설정"
          description={
            <>
              새로운 비밀번호를 입력해주세요
              <br />
              안전한 비밀번호를 설정해 계정을 보호하세요
            </>
          }
        />
        <form
          onSubmit={handleResetSubmit}
          className="w-full max-w-95 flex flex-col items-center gap-7.5"
        >
          <div className="flex w-full flex-col gap-7">
            <Input
              label="새 비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              helperText="영문, 숫자, 특수문자를 포함한 8자 이상을 입력해주세요"
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              error={passwordError}
              focusShadow={false}
              autoComplete="new-password"
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={handlePasswordConfirmBlur}
              error={passwordConfirmError}
              focusShadow={false}
              autoComplete="new-password"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-7.5 p-2.5">
            {submitError && (
              <p className="text-center text-sm text-status-error">
                {submitError}
              </p>
            )}
            <Button type="submit" inactive={!canSubmitPassword}>
              {isSubmitting ? '변경 중...' : '비밀번호 변경'}
            </Button>
            <Link
              href="/login"
              className="text-sm text-primary-500 hover:underline"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <StepHeader
        icon={<Check size={24} className="text-primary-500" />}
        title="비밀번호가 변경되었습니다"
        description="새로운 비밀번호로 안전하게 로그인할 수 있습니다"
      />
      <Button type="button" onClick={() => router.push('/login')}>
        로그인하기
      </Button>
    </>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/auth/ui/Input';
import Button from '@/components/auth/ui/Button';
import Checkbox from '@/components/auth/ui/Checkbox';
import GoogleButton from '@/components/auth/ui/GoogleButton';
import EmailField from '@/components/auth/forms/EmailField';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { useEmailField } from '@/hooks/useEmailField';
import { usePasswordField } from '@/hooks/usePasswordField';
import { EMAIL_REGEX } from '@/types/auth';
import { signup } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const { email, setEmail } = useEmailField();
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    passwordConfirmError,
    handlePasswordConfirmBlur,
    isValid: isPasswordSectionValid,
  } = usePasswordField();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    status: verificationStatus,
    resendCooldown,
    code,
    error: verificationError,
    isVerified: isEmailVerified,
    setCode,
    requestCode,
    verifyCode,
  } = useEmailVerification(email);

  const isEmailValid = EMAIL_REGEX.test(email);
  const canRequestCode =
    isEmailValid &&
    resendCooldown === 0 &&
    verificationStatus !== 'sending' &&
    verificationStatus !== 'verified';

  const canSubmit =
    name.length > 0 &&
    isEmailVerified &&
    isPasswordSectionValid &&
    agreeTerms &&
    agreePrivacy;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // verify-email에서 받은 세션 쿠키로 가입을 완료한다.
      await signup({ name, email, password });
      router.push('/login');
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <GoogleButton />

      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-placeholder">또는</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex w-full max-w-95 flex-col gap-7">
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          focusShadow={false}
          autoComplete="off"
        />

        <EmailField
          email={email}
          onEmailChange={setEmail}
          onRequestCode={requestCode}
          canRequestCode={canRequestCode}
          isEmailVerified={isEmailVerified}
          status={verificationStatus}
          resendCooldown={resendCooldown}
          code={code}
          onCodeChange={setCode}
          onVerify={verifyCode}
          error={verificationError}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="영문, 숫자, 특수문자를 포함한 8자 이상을 입력해주세요"
          focusShadow={false}
          autoComplete="new-password"
        />

        <Input
          label="비밀번호 확인"
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

      <div className="flex w-full flex-col gap-2 px-5">
        <Checkbox
          checked={agreeTerms}
          onChange={setAgreeTerms}
          label="이용약관에 동의합니다"
          required
          onViewClick={() => {
            // TODO: 약관 모달/페이지 연결
          }}
        />
        <Checkbox
          checked={agreePrivacy}
          onChange={setAgreePrivacy}
          label="개인정보처리방침에 동의합니다"
          required
          onViewClick={() => {
            // TODO: 개인정보처리방침 모달/페이지 연결
          }}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        {submitError && (
          <p className="text-center text-sm text-status-error">{submitError}</p>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          inactive={!canSubmit || isSubmitting}
        >
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </Button>
      </div>

      <p className="text-sm text-text-placeholder">
        이미 계정이 있나요?
        <Link href="/login" className="text-primary-300 hover:underline pl-2.5">
          로그인
        </Link>
      </p>
    </div>
  );
}

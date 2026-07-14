'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Checkbox from '@/components/auth/Checkbox';
import GoogleButton from '@/components/auth/GoogleButton';
import EmailField from '@/components/auth/EmailField';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/types/auth';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  const {
    status: verificationStatus,
    timeLeft,
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
    verificationStatus !== 'sending' &&
    verificationStatus !== 'verified';

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const passwordError =
    passwordTouched && password.length > 0 && !isPasswordValid
      ? '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
      : undefined;

  const passwordConfirmError =
    passwordConfirmTouched &&
    passwordConfirm.length > 0 &&
    password !== passwordConfirm
      ? '비밀번호가 일치하지 않습니다.'
      : undefined;

  const canSubmit =
    name.length > 0 &&
    isEmailVerified &&
    isPasswordValid &&
    password === passwordConfirm &&
    agreeTerms &&
    agreePrivacy;

  const handleSubmit = () => {
    if (!canSubmit) return;
    // TODO: await api.signup({ name, email, password })
  };

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <GoogleButton />

      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-placeholder">또는</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex w-95 flex-col gap-7">
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <EmailField
          email={email}
          onEmailChange={setEmail}
          onRequestCode={requestCode}
          canRequestCode={canRequestCode}
          isEmailVerified={isEmailVerified}
          status={verificationStatus}
          timeLeft={timeLeft}
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
          onBlur={() => setPasswordTouched(true)}
          error={passwordError}
        />

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={() => setPasswordConfirmTouched(true)}
          error={passwordConfirmError}
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

      <Button type="button" onClick={handleSubmit} inactive={!canSubmit}>
        회원가입
      </Button>

      <p className="text-sm text-text-placeholder">
        이미 계정이 있나요?
        <Link href="/login" className="text-primary-500 hover:underline pl-2.5">
          로그인
        </Link>
      </p>
    </div>
  );
}

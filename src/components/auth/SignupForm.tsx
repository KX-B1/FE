'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Checkbox from '@/components/auth/Checkbox';
import GoogleButton from '@/components/auth/GoogleButton';
import EmailField from '@/components/auth/EmailField';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;
const CODE_TTL_SECONDS = 180; // 인증번호 유효시간 3분 (조정 필요)

type VerificationStatus =
  'idle' | 'sending' | 'sent' | 'expired' | 'verifying' | 'verified' | 'error';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  // --- 이메일 인증 상태 (추후 useEmailVerification 훅으로 분리 예정) ---
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(CODE_TTL_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setVerificationStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const requestCode = useCallback(async () => {
    if (!email) return;
    setVerificationStatus('sending');
    setVerificationError(null);
    try {
      // TODO: await api.requestEmailVerification(email)
      setCode('');
      setVerificationStatus('sent');
      startTimer();
    } catch {
      setVerificationStatus('error');
      setVerificationError('인증번호 발송에 실패했습니다.');
    }
  }, [email, startTimer]);

  const verifyCode = useCallback(async () => {
    setVerificationStatus('verifying');
    setVerificationError(null);
    try {
      // TODO: await api.verifyEmailCode(email, code)
      clearTimer();
      setVerificationStatus('verified');
    } catch {
      setVerificationError('인증번호가 일치하지 않습니다.');
      setVerificationStatus('sent');
    }
  }, [email, code]);
  // --- 이메일 인증 상태 끝 ---

  const isEmailValid = EMAIL_REGEX.test(email);
  const isEmailVerified = verificationStatus === 'verified';
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

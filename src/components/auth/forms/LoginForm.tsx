'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/auth/ui/Input';
import Button from '@/components/auth/ui/Button';
import GoogleButton from '@/components/auth/ui/GoogleButton';
import { useEmailField } from '@/hooks/useEmailField';
import { login } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';

export default function LoginForm() {
  const router = useRouter();
  const {
    email,
    error: emailError,
    setError: setEmailError,
    validate: validateEmail,
    handleChange: handleEmailChange,
  } = useEmailField();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormFilled = email.trim() !== '' && password.trim() !== '';

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.push('/create');
    } catch (error) {
      if (!(error instanceof ApiError)) {
        setPasswordError(
          '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요'
        );
      } else if (error.code === 'INVALID_CREDENTIALS') {
        setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다');
      } else if (error.code === 'EMAIL_NOT_CONFIRMED') {
        setEmailError(
          '이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요'
        );
      } else {
        setPasswordError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-95 flex flex-col items-center gap-7.5"
    >
      <GoogleButton mode="login" />
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-placeholder">또는</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="w-full">
        <Input
          label="이메일"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => validateEmail(email)}
          error={emailError}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <Input
          label="비밀번호"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => validatePassword(password)}
          error={passwordError}
        />
        <Link
          href="/forgot-password"
          className="self-end pr-2 text-sm text-primary-300 hover:underline"
        >
          비밀번호 찾기
        </Link>
      </div>

      <div className="flex w-full flex-col items-center gap-7.5 p-2.5">
        <Button type="submit" inactive={!isFormFilled || isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
        <p className="text-center text-sm text-text-placeholder">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="ml-2.5 text-primary-300 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}

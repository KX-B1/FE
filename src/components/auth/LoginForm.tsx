'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import GoogleButton from '@/components/auth/GoogleButton';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/types/auth';

// 임시 로그인용 더미 계정 (백엔드 연동 전까지 사용)
const DUMMY_USER = {
  email: 'test@example.com',
  password: 'qwer_1234',
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isFormFilled = email.trim() !== '' && password.trim() !== '';

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    }
    if (!PASSWORD_REGEX.test(value)) {
      setPasswordError('영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    // TODO: 실제 login() API 연동 시 더미 계정 검증 제거
    if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
      setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다');
      return;
    }
    router.push('/create');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-95 flex flex-col items-center gap-7.5"
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
          className="self-end pr-2 text-sm text-primary-500 hover:underline"
        >
          비밀번호 찾기
        </Link>
      </div>

      <div className="flex w-full flex-col items-center gap-7.5 p-2.5">
        <Button type="submit" inactive={!isFormFilled}>
          로그인
        </Button>
        <p className="text-center text-sm text-text-placeholder">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="ml-2.5 text-primary-500 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}

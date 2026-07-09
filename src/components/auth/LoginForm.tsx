'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
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
    if (!emailRegex.test(value)) {
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
    if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다');
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
    // TODO: login() 연결
  };

  return (
    <form onSubmit={handleSubmit} className="w-95 flex flex-col gap-7.5">
      <Input
        label="이메일"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => validateEmail(email)}
        error={emailError}
      />

      <div className="flex flex-col gap-2">
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

      <div className="flex flex-col items-center gap-7.5 p-2.5">
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

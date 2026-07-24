'use client';

import { useState } from 'react';
import { PASSWORD_REGEX } from '@/types/auth';

export function usePasswordField() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isMatch = password === passwordConfirm;

  const passwordConfirmError =
    passwordConfirmTouched && passwordConfirm.length > 0 && !isMatch
      ? '비밀번호가 일치하지 않습니다.'
      : undefined;

  const handlePasswordConfirmBlur = () => setPasswordConfirmTouched(true);

  const isValid = isPasswordValid && isMatch;

  return {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    passwordConfirmError,
    handlePasswordConfirmBlur,
    isValid,
  };
}

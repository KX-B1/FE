'use client';

import { useState } from 'react';
import { EMAIL_REGEX } from '@/types/auth';

export function useEmailField(initialEmail = '') {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (!value) {
      setError('이메일을 입력해주세요');
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (error) validate(value);
  };

  return {
    email,
    setEmail,
    error,
    setError,
    validate,
    handleChange,
  };
}

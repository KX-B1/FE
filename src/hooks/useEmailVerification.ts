'use client';

import { useCallback, useRef, useState } from 'react';
import { CODE_TTL_SECONDS, type VerificationStatus } from '@/types/auth';

export function useEmailVerification(email: string) {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
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
          setStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const requestCode = useCallback(async () => {
    if (!email) return;
    setStatus('sending');
    setError(null);
    try {
      // TODO: await api.requestEmailVerification(email)
      setCode('');
      setStatus('sent');
      startTimer();
    } catch {
      setStatus('error');
      setError('인증번호 발송에 실패했습니다.');
    }
  }, [email, startTimer]);

  const verifyCode = useCallback(async () => {
    setStatus('verifying');
    setError(null);
    try {
      // TODO: await api.verifyEmailCode(email, code)
      clearTimer();
      setStatus('verified');
    } catch {
      setError('인증번호가 일치하지 않습니다.');
      setStatus('sent');
    }
  }, [email, code]);

  const isVerified = status === 'verified';

  return {
    status,
    timeLeft,
    code,
    error,
    isVerified,
    setCode,
    requestCode,
    verifyCode,
  };
}

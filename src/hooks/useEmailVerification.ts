'use client';

import { useCallback, useRef, useState } from 'react';
import type { VerificationStatus } from '@/types/auth';
import {
  forgotPassword,
  resendVerification,
  sendVerification,
  verifyEmail,
} from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';

const DEFAULT_RESEND_COOLDOWN = 60;

interface UseEmailVerificationOptions {
  type?: 'signup' | 'recovery';
}

export function useEmailVerification(
  email: string,
  { type = 'signup' }: UseEmailVerificationOptions = {}
) {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRequestedRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startCooldown = useCallback((seconds: number) => {
    clearTimer();
    setResendCooldown(seconds);
    if (seconds <= 0) return;
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const requestCode = useCallback(async () => {
    if (!email) return false;
    setStatus('sending');
    setError(null);
    try {
      const res =
        type === 'recovery'
          ? await forgotPassword(email)
          : hasRequestedRef.current
            ? await resendVerification(email)
            : await sendVerification(email);
      hasRequestedRef.current = true;
      setCode('');
      setStatus('sent');
      startCooldown(res.retryAfterSeconds ?? DEFAULT_RESEND_COOLDOWN);
      return true;
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof ApiError ? err.message : '인증번호 발송에 실패했습니다.'
      );
      return false;
    }
  }, [email, type, startCooldown]);

  const verifyCode = useCallback(async () => {
    setStatus('verifying');
    setError(null);
    try {
      await verifyEmail(
        email,
        code,
        type === 'recovery' ? 'recovery' : undefined
      );
      clearTimer();
      setStatus('verified');
      return true;
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : '인증번호가 일치하지 않습니다.'
      );
      setStatus('sent');
      return false;
    }
  }, [email, code, type]);

  const isVerified = status === 'verified';

  return {
    status,
    resendCooldown,
    code,
    error,
    isVerified,
    setCode,
    requestCode,
    verifyCode,
  };
}

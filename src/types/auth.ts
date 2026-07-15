export interface AuthCardProps {
  subtitle: string;
  children: React.ReactNode;
}

export type VerificationStatus =
  | 'idle'
  | 'sending'
  | 'sent'
  | 'expired'
  | 'verifying'
  | 'verified'
  | 'error';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

// 인증번호 유효시간 3분 (조정 필요)
export const CODE_TTL_SECONDS = 180;

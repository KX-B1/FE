export interface AuthCardProps {
  subtitle?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export interface SignupCardProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  inactive?: boolean;
}

export interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  focusShadow?: boolean;
  autoComplete?: string;
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  required?: boolean;
  onViewClick?: () => void;
}

export interface GoogleButtonProps {
  onClick?: () => void;
  mode?: 'signup' | 'login';
  label?: string;
}

export interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export type VerificationStatus =
  'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error';

export interface EmailFieldProps {
  email: string;
  onEmailChange: (value: string) => void;
  onRequestCode: () => void;
  canRequestCode: boolean;
  isEmailVerified: boolean;
  status: VerificationStatus;
  resendCooldown: number;
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  error: string | null;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

/** 인증 코드 자릿수 / 현재 8자리 발송 / 추후 6자리로 변경 예정 */
export const OTP_LENGTH = 8;

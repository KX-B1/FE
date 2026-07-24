import { apiClient, unwrap, type ApiResponse } from '@/lib/api/client';

/** 회원가입/비밀번호 찾기 진행 단계 (fe-integration.md의 nextStep) */
export type NextStep =
  | 'verify_email'
  | 'verify_recovery'
  | 'complete_signup'
  | 'reset_password'
  | 'done'
  | 'login';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailConfirmed?: boolean;
  createdAt?: string;
}

/* 1) 이메일 인증 코드 발송 */
export interface SendVerificationResponse {
  email: string;
  sent: boolean;
  nextStep: NextStep;
  retryAfterSeconds: number;
}

export function sendVerification(email: string) {
  return unwrap(
    apiClient.post<ApiResponse<SendVerificationResponse>>(
      '/api/auth/send-verification',
      { email }
    )
  );
}

/** 코드 재전송 (send-verification과 동일 동작) */
export function resendVerification(email: string) {
  return unwrap(
    apiClient.post<ApiResponse<SendVerificationResponse>>(
      '/api/auth/resend-verification',
      { email }
    )
  );
}

/* 2) 코드 확인. 성공 시 BE가 세션 쿠키를 설정한다. */
export interface VerifyEmailResponse {
  verified: boolean;
  email: string;
  userId: string;
  nextStep: NextStep;
}

/** type: 'recovery'면 비밀번호 찾기 플로우의 코드 확인이다. */
export function verifyEmail(email: string, code: string, type?: 'recovery') {
  return unwrap(
    apiClient.post<ApiResponse<VerifyEmailResponse>>('/api/auth/verify-email', {
      email,
      code,
      ...(type ? { type } : {}),
    })
  );
}

/* 3) 가입 완료. verify-email로 받은 세션 쿠키가 필요하다. */
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  user: AuthUser;
  session: Record<string, unknown>;
  nextStep: NextStep;
}

export function signup(payload: SignupRequest) {
  return unwrap(
    apiClient.post<ApiResponse<SignupResponse>>('/api/auth/signup', payload)
  );
}

/* 로그인. 성공 시 Set-Cookie로 HttpOnly 세션 쿠키가 내려온다. */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  session: {
    accessToken: string;
    expiresAt: number;
    expiresIn: number;
  };
}

export function login(payload: LoginRequest) {
  return unwrap(
    apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', payload)
  );
}

/** 내 정보 조회 (세션 쿠키 필요) 아직 조회할 수 있는 페이지 없음 */
export function getMe() {
  return unwrap(apiClient.get<ApiResponse<{ user: AuthUser }>>('/api/auth/me'));
}

/** 로그아웃 (세션 쿠키 필요) */
export function logout() {
  return unwrap(
    apiClient.post<ApiResponse<{ loggedOut: boolean }>>('/api/auth/logout')
  );
}

/** 세션 갱신 (세션 쿠키 필요) */
export function refresh() {
  return unwrap(apiClient.post<ApiResponse<unknown>>('/api/auth/refresh'));
}

/* 비밀번호 찾기 1) 가입 완료된 이메일에 recovery 인증 코드 발송 */
export interface ForgotPasswordResponse {
  email: string;
  sent: boolean;
  nextStep: NextStep;
  retryAfterSeconds: number;
}

/** 재전송도 동일 엔드포인트를 다시 호출한다. */
export function forgotPassword(email: string) {
  return unwrap(
    apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      '/api/auth/forgot-password',
      { email }
    )
  );
}

/* 비밀번호 찾기 3) verify-email(type: recovery)의 세션 쿠키로 비밀번호 변경 */
export interface ResetPasswordResponse {
  reset: boolean;
  nextStep: NextStep;
}

export function resetPassword(password: string) {
  return unwrap(
    apiClient.post<ApiResponse<ResetPasswordResponse>>(
      '/api/auth/reset-password',
      { password }
    )
  );
}

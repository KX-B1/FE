// 타입
type ApiSuccess<T> = { success: true; data: T; message?: string };
type ApiErrorBody = {
  success: false;
  error: { code: string; message: string; details?: unknown };
};
type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;

// apiFetch
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
export class ApiException extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
  }
}
export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiException('NETWORK_ERROR', '서버에 연결할 수 없습니다.', 0);
  }
  const json = (await res.json()) as ApiResponse<T>;
  if (!json.success) {
    if (res.status === 401 && json.error.code !== 'INVALID_CREDENTIALS') {
      window.location.href = '/login';
    }
    throw new ApiException(
      json.error.code,
      json.error.message,
      res.status,
      json.error.details
    );
  }
  return json.data;
}

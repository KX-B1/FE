import axios, { AxiosError, type AxiosResponse } from 'axios';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;

export class ApiError extends Error {
  code: string;
  status: number;
  details: unknown;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const apiClient = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          0,
          'NETWORK_ERROR',
          '서버에 연결할 수 없습니다. 연결을 확인해주세요.'
        )
      );
    }

    const { status, data } = error.response;
    const body = data?.error;
    return Promise.reject(
      new ApiError(
        status,
        body?.code ?? 'UNKNOWN_ERROR',
        body?.message ?? '요청 처리 중 오류가 발생했습니다.',
        body?.details
      )
    );
  }
);

export async function unwrap<T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> {
  const { status, data: body } = await request;
  if (!body.success) {
    throw new ApiError(
      status,
      body.error.code,
      body.error.message,
      body.error.details
    );
  }
  return body.data;
}

import {
  handleFetchError,
  handleResponse,
  handleResponseError,
} from './fetcher.handlers';
import { ApiError } from './fetcher.handlers';
import { useAuthStore } from '@/features/auth/stores/authStore';
import type { ApiResponse } from './api.types';
export { ApiError } from './fetcher.handlers';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

// ============================================================
// createFetcher
// ============================================================

interface CreateFetcherOptions {
  baseURL?: string;
  headers?: HeadersInit;
  fetchOptions?: RequestInit;
  /**
   * 현재 액세스 토큰을 반환하는 함수.
   * auth store 연동 시 주입합니다.
   *
   * @example
   * getAccessToken: () => useAuthStore.getState().accessToken
   */
  getAccessToken?: () => string | null | undefined;
  /**
   * 인증 만료 시 토큰을 재발급하고 요청을 한 번 재시도합니다.
   * 새로운 액세스 토큰 문자열을 반환해야 합니다.
   *
   * @example
   * onRefreshToken: async () => {
   *   const res = await fetch('/api/auth/refresh', { ... });
   *   const { accessToken } = await res.json();
   *   useAuthStore.getState().setAccessToken(accessToken);
   *   return accessToken;
   * }
   */
  onRefreshToken?: () => Promise<string>;
  /**
   * 401 응답에서 토큰 갱신을 트리거할 서버 에러 코드.
   * 미설정 시 모든 401에서 갱신을 시도합니다.
   *
   * @example 'AUTHORIZATION4002'
   */
  tokenExpiredCode?: string;
  onAuthFailure?: () => void;
}

export interface CustomRequestInit extends RequestInit {
  /**
   * true로 설정하면 getAccessToken으로 가져온 토큰을 Authorization 헤더에 자동 주입합니다.
   */
  auth?: boolean;
}

export const createFetcher = ({
  baseURL = BASE_URL,
  headers,
  fetchOptions,
  getAccessToken,
  onRefreshToken,
  tokenExpiredCode,
  onAuthFailure,
}: CreateFetcherOptions = {}) => {
  // 동시에 여러 요청의 토큰이 만료되어도 갱신은 한 번만 실행합니다.
  let refreshPromise: Promise<string> | null = null;

  return async function innerFetcher<T>(
    path: string,
    options?: CustomRequestInit,
  ): Promise<T> {
    if (!baseURL) {
      throw new Error(
        'API baseURL이 누락되었습니다. NEXT_PUBLIC_API_BASE_URL 환경 변수를 확인하세요.',
      );
    }

    const url = `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    const isFormData = options?.body instanceof FormData;

    const mergedHeaders = new Headers(headers);

    if (options?.headers) {
      new Headers(options.headers).forEach((value, key) =>
        mergedHeaders.set(key, value),
      );
    }

    if (!mergedHeaders.has('Accept')) {
      mergedHeaders.set('Accept', 'application/json');
    }

    // auth: true인 경우 액세스 토큰을 Authorization 헤더에 주입합니다.
    const requiresAuth = options?.auth ?? false;
    if (requiresAuth && !mergedHeaders.has('Authorization')) {
      const token = getAccessToken?.();
      if (!token) {
        throw new ApiError({
          status: 401,
          code: 'AUTH_REQUIRED',
          message: '로그인이 필요합니다.',
        });
      }
      mergedHeaders.set('Authorization', `Bearer ${token}`);
    }

    // FormData이면 브라우저가 Content-Type(multipart boundary 포함)을 자동으로 설정하도록 제거합니다.
    if (isFormData) {
      mergedHeaders.delete('Content-Type');
    } else if (!mergedHeaders.has('Content-Type')) {
      mergedHeaders.set('Content-Type', 'application/json');
    }

    const mergedOptions: RequestInit = {
      ...fetchOptions,
      ...options,
      headers: mergedHeaders,
    };

    try {
      const res = await fetch(url, mergedOptions);

      if (res.ok) return handleResponse<T>(res);

      // 백엔드는 토큰 만료를 403 + 'Token has expired'로 반환합니다.
      if (
        requiresAuth &&
        (res.status === 401 || res.status === 403) &&
        onRefreshToken
      ) {
        let resCode: string | undefined;
        let resMessage: string | undefined;
        try {
          const ct = res.headers.get('content-type') ?? '';
          if (ct.includes('application/json')) {
            const body = (await res.clone().json()) as {
              code?: string;
              message?: string;
            };
            resCode = body.code;
            resMessage = body.message;
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }

        const shouldRefresh = tokenExpiredCode
          ? resCode === tokenExpiredCode
          : res.status === 401 || resMessage === 'Token has expired';

        if (shouldRefresh) {
          if (!refreshPromise) {
            refreshPromise = onRefreshToken().finally(() => {
              refreshPromise = null;
            });
          }

          let newToken: string;
          try {
            newToken = await refreshPromise;
          } catch (error) {
            // Network failures preserve the session so users can retry.
            if (
              error instanceof ApiError &&
              [400, 401, 403].includes(error.status)
            )
              onAuthFailure?.();
            throw error;
          }
          mergedHeaders.set('Authorization', `Bearer ${newToken}`);

          try {
            const retryRes = await fetch(url, {
              ...fetchOptions,
              ...options,
              headers: mergedHeaders,
            });
            if (retryRes.ok) return handleResponse<T>(retryRes);
            if (retryRes.status === 401) onAuthFailure?.();
            if (retryRes.status === 403) {
              const body = (await retryRes
                .clone()
                .json()
                .catch(() => null)) as { message?: string } | null;
              if (
                body?.message === 'Invalid token' ||
                body?.message === 'Token has expired'
              )
                onAuthFailure?.();
            }
            return handleResponseError(retryRes, url, options?.method);
          } catch (error) {
            return handleFetchError(error);
          }
        }
      }

      if (requiresAuth && res.status === 401) onAuthFailure?.();
      if (requiresAuth && res.status === 403) {
        const body = (await res
          .clone()
          .json()
          .catch(() => null)) as { message?: string } | null;
        if (body?.message === 'Invalid token') onAuthFailure?.();
      }

      return handleResponseError(res, url, mergedOptions.method);
    } catch (error) {
      return handleFetchError(error);
    }
  };
};

// ============================================================
// Fetcher 인스턴스
// ============================================================

/**
 * 인증이 필요 없는 기본 API 요청에 사용합니다.
 */
export const defaultApi = createFetcher({
  fetchOptions: { cache: 'no-store' },
});

export const authApi = createFetcher({
  fetchOptions: { cache: 'no-store' },
  getAccessToken: () => useAuthStore.getState().accessToken,
  onRefreshToken: async () => {
    const { accessToken: previousToken, refreshToken } =
      useAuthStore.getState();
    if (!refreshToken) {
      throw new ApiError({
        status: 401,
        code: 'AUTH_REQUIRED',
        message: '다시 로그인해 주세요.',
      });
    }
    const response = await defaultApi<ApiResponse<{ accessToken: string }>>(
      '/token/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      },
    );
    if (!response.isSuccess || !response.result?.accessToken) {
      throw new ApiError({
        status: 401,
        message: response.message || '토큰 갱신에 실패했습니다.',
      });
    }
    const current = useAuthStore.getState();
    if (
      current.refreshToken !== refreshToken ||
      current.accessToken !== previousToken
    ) {
      throw new Error('로그인 상태가 변경되었습니다. 다시 요청해 주세요.');
    }
    current.setAccessToken(response.result.accessToken);
    return response.result.accessToken;
  },
  onAuthFailure: () => useAuthStore.getState().clearTokens(),
});

// ============================================================
// 편의 메서드
// ============================================================

type FetchOptions = Omit<CustomRequestInit, 'method' | 'body'> & {
  body?: unknown;
};

const request = <T>(endpoint: string, options: CustomRequestInit) =>
  (options.auth ? authApi : defaultApi)<T>(endpoint, options);

const serializeBody = (body: unknown): BodyInit | undefined => {
  if (body === undefined) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

/**
 * auth: true인 요청은 authApi, 나머지 요청은 defaultApi를 사용합니다.
 *
 * @example
 * fetcher.get<Res>('/api/endpoint')
 * fetcher.post<Res>('/api/endpoint', { name: 'test' })
 * fetcher.post<Res>('/api/endpoint', formData, { auth: true })
 */
export const fetcher = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<FetchOptions, 'body'>,
  ) =>
    request<T>(endpoint, {
      method: 'POST',
      ...options,
      body: serializeBody(body),
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<FetchOptions, 'body'>,
  ) =>
    request<T>(endpoint, {
      method: 'PUT',
      ...options,
      body: serializeBody(body),
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<FetchOptions, 'body'>,
  ) =>
    request<T>(endpoint, {
      method: 'PATCH',
      ...options,
      body: serializeBody(body),
    }),

  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};

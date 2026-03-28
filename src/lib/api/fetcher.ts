import { handleFetchError, handleResponse, handleResponseError } from './fetcher.handlers';
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
   * 토큰 갱신 함수. 주입하면 401 응답 시 토큰을 재발급하고 요청을 자동으로 재시도합니다.
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
}: CreateFetcherOptions = {}) => {
  // 동시에 여러 요청이 401을 받더라도 토큰 갱신은 한 번만 실행합니다.
  let refreshPromise: Promise<string> | null = null;

  return async function innerFetcher<T>(path: string, options?: CustomRequestInit): Promise<T> {
    if (!baseURL) {
      throw new Error(
        'API baseURL이 누락되었습니다. NEXT_PUBLIC_API_BASE_URL 환경 변수를 확인하세요.',
      );
    }

    const url = `${baseURL}${path}`;
    const isFormData = options?.body instanceof FormData;

    const mergedHeaders = new Headers(headers);

    if (options?.headers) {
      new Headers(options.headers).forEach((value, key) => mergedHeaders.set(key, value));
    }

    if (!mergedHeaders.has('Accept')) {
      mergedHeaders.set('Accept', 'application/json');
    }

    // auth: true인 경우 액세스 토큰을 Authorization 헤더에 주입합니다.
    const requiresAuth = options?.auth ?? false;
    if (requiresAuth && !mergedHeaders.has('Authorization') && getAccessToken) {
      const token = getAccessToken();
      if (token) mergedHeaders.set('Authorization', `Bearer ${token}`);
    }

    // FormData이면 브라우저가 Content-Type(multipart boundary 포함)을 자동으로 설정하도록 제거합니다.
    if (isFormData) {
      mergedHeaders.delete('Content-Type');
    } else if (!mergedHeaders.has('Content-Type')) {
      mergedHeaders.set('Content-Type', 'application/json');
    }

    const mergedOptions: RequestInit = { ...fetchOptions, ...options, headers: mergedHeaders };

    try {
      const res = await fetch(url, mergedOptions);

      if (res.ok) return handleResponse<T>(res);

      // 401 응답 시 토큰 갱신 후 재시도합니다.
      if (res.status === 401 && onRefreshToken) {
        let resCode: string | undefined;
        try {
          const ct = res.headers.get('content-type') ?? '';
          if (ct.includes('application/json')) {
            const body = (await res.clone().json()) as { code?: string };
            resCode = body.code;
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }

        const shouldRefresh = tokenExpiredCode ? resCode === tokenExpiredCode : true;

        if (shouldRefresh) {
          if (!refreshPromise) {
            refreshPromise = onRefreshToken().finally(() => {
              refreshPromise = null;
            });
          }

          const newToken = await refreshPromise;
          mergedHeaders.set('Authorization', `Bearer ${newToken}`);

          try {
            const retryRes = await fetch(url, { ...fetchOptions, ...options, headers: mergedHeaders });
            if (retryRes.ok) return handleResponse<T>(retryRes);
            return handleResponseError(retryRes, url, options?.method);
          } catch (error) {
            return handleFetchError(error);
          }
        }
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
export const defaultApi = createFetcher({ fetchOptions: { cache: 'no-store' } });

/**
 * 인증 + 토큰 자동 갱신이 필요한 fetcher 인스턴스입니다.
 * auth store 구현 후 아래를 활성화하세요.
 *
 * @example
 * import useAuthStore from '@features/auth/stores/auth-store';
 *
 * export const authApi = createFetcher({
 *   fetchOptions: { cache: 'no-store' },
 *   getAccessToken: () => useAuthStore.getState().accessToken,
 *   tokenExpiredCode: 'AUTHORIZATION4002',
 *   onRefreshToken: async () => {
 *     const { refreshToken, actions } = useAuthStore.getState();
 *     const res = await fetch('/api/auth/refresh', {
 *       method: 'POST',
 *       headers: { RefreshToken: refreshToken ?? '' },
 *     });
 *     if (!res.ok) {
 *       actions.clearTokens();
 *       throw new ApiError({ status: res.status, message: 'Token refresh failed', code: 'TOKEN_REFRESH_FAILED' });
 *     }
 *     const { accessToken, refreshToken: newRefreshToken } = (await res.json()).result;
 *     actions.setAccessToken(accessToken);
 *     actions.setRefreshToken(newRefreshToken);
 *     return accessToken;
 *   },
 * });
 */

// ============================================================
// 편의 메서드
// ============================================================

type FetchOptions = Omit<CustomRequestInit, 'method' | 'body'> & { body?: unknown };

const serializeBody = (body: unknown): BodyInit | undefined => {
  if (body === undefined) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

/**
 * HTTP 메서드별 편의 메서드입니다. 내부적으로 defaultApi를 사용합니다.
 *
 * @example
 * fetcher.get<Res>('/api/endpoint')
 * fetcher.post<Res>('/api/endpoint', { name: 'test' })
 * fetcher.post<Res>('/api/endpoint', formData, { auth: true })
 */
export const fetcher = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
    defaultApi<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'body'>) =>
    defaultApi<T>(endpoint, { method: 'POST', ...options, body: serializeBody(body) }),

  put: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'body'>) =>
    defaultApi<T>(endpoint, { method: 'PUT', ...options, body: serializeBody(body) }),

  patch: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'body'>) =>
    defaultApi<T>(endpoint, { method: 'PATCH', ...options, body: serializeBody(body) }),

  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) =>
    defaultApi<T>(endpoint, { method: 'DELETE', ...options }),
};

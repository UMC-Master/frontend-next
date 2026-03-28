// ============================================================
// ApiError
// ============================================================

interface ApiErrorOptions {
  status: number;
  message: string;
  code?: string;
  body?: unknown;
  rawText?: string;
  url?: string;
  method?: string;
}

export class ApiError extends Error {
  status: number;
  code: string;
  body: unknown;
  rawText: string;
  url: string;
  method: string;

  constructor({ status, message, code, body, rawText, url, method }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code ?? 'UNKNOWN';
    this.body = body ?? null;
    this.rawText = rawText ?? '';
    this.url = url ?? '';
    this.method = method ?? '';
  }
}

// ============================================================
// Response Handlers
// ============================================================

interface ApiErrorBody {
  code?: string;
  message?: string;
}

/** 성공 응답을 JSON으로 파싱합니다. 본문이 없는 경우(204 등) undefined를 반환합니다. */
export const handleResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
};

/** 에러 응답을 파싱해 ApiError를 throw합니다. */
export const handleResponseError = async (
  res: Response,
  url: string,
  method?: string,
): Promise<never> => {
  const contentType = res.headers.get('content-type');
  const rawText = await res.text();

  let responseBody: ApiErrorBody = {
    code: 'UNKNOWN',
    message: `API error ${res.status}`,
  };

  if (contentType?.includes('application/json')) {
    try {
      responseBody = JSON.parse(rawText) as ApiErrorBody;
    } catch {
      // 파싱 실패 시 기본값 사용
    }
  }

  throw new ApiError({
    status: res.status,
    message: responseBody.message ?? `API error ${res.status}`,
    code: responseBody.code,
    body: responseBody,
    rawText,
    url,
    method,
  });
};

/** fetch 자체가 실패한 경우(네트워크 끊김, DNS, CORS 등) error를 그대로 throw합니다. */
export const handleFetchError = (error: unknown): never => {
  throw error;
};

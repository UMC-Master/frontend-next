import { ApiError, fetcher } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';
import type { AuthTokens } from '@/features/auth/stores/authStore';

export interface UserProfile {
  user_id: number;
  nickname: string | null;
  email: string | null;
  profile_image_url: string | null;
  city: string | null;
  district: string | null;
  role: string;
  hashtags: Array<{ hashtag: { hashtag_id: number; name: string } }>;
}

const readTokens = (response: ApiResponse<AuthTokens>): AuthTokens => {
  if (
    !response.isSuccess ||
    !response.result?.accessToken ||
    !response.result?.refreshToken
  ) {
    throw new ApiError({
      status: 400,
      message: response.message || '로그인 응답이 올바르지 않습니다.',
    });
  }
  return response.result;
};

export const signIn = async (email: string, password: string) =>
  readTokens(
    await fetcher.post<ApiResponse<AuthTokens>>('/login', { email, password }),
  );

export const signInWithKakao = async (code: string) =>
  readTokens(
    await fetcher.post<ApiResponse<AuthTokens>>('/login/kakao', { code }),
  );

export const getProfile = async () => {
  const response = await fetcher.get<ApiResponse<UserProfile>>('/profile', {
    auth: true,
  });
  if (!response.isSuccess || !response.result) {
    throw new ApiError({
      status: 400,
      message: response.message || '프로필 조회에 실패했습니다.',
    });
  }
  return response.result;
};

interface MessageResponse {
  message: string;
  isSuccess?: boolean;
}

const checkMessage = (response: MessageResponse) => {
  if (response.isSuccess === false) {
    throw new ApiError({ status: 400, message: response.message });
  }
  return response;
};

export const requestSignupVerification = async (email: string) => {
  checkMessage(await fetcher.post<MessageResponse>('/check-email', { email }));
  return checkMessage(
    await fetcher.post<MessageResponse>('/auth/send-verification-email', {
      email,
    }),
  );
};

export const verifySignupEmail = async (email: string, code: string) =>
  checkMessage(
    await fetcher.post<MessageResponse>('/auth/verify-email-code', {
      email,
      code,
    }),
  );

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  city?: string;
  district?: string;
  hashtags: string[];
}

export const signUp = async (data: SignupRequest) => {
  const response = await fetcher.post<ApiResponse<unknown>>('/signup', data);
  checkMessage(response);
  return response.result;
};

export const requestPasswordReset = async (email: string) =>
  checkMessage(
    await fetcher.post<MessageResponse>('/password/reset', { email }),
  );

export const confirmPasswordReset = async (
  resetToken: string,
  newPassword: string,
) =>
  checkMessage(
    await fetcher.post<MessageResponse>('/password/reset/confirm', {
      resetToken,
      newPassword,
    }),
  );

export interface UserStatistics {
  quizScore: number;
  tipsSharedCount: number;
  likesReceived: number;
}

export const getStatistics = async () => {
  const response = await fetcher.get<ApiResponse<UserStatistics>>(
    '/statistics',
    { auth: true },
  );
  if (!response.isSuccess || !response.result)
    throw new ApiError({
      status: 400,
      message: response.message || '통계 조회에 실패했습니다.',
    });
  return response.result;
};

export const deactivateAccount = async () =>
  checkMessage(
    await fetcher.delete<MessageResponse>('/deactivate', { auth: true }),
  );

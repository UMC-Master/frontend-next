import { ApiError, fetcher } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';

export interface Challenge {
  challengeId: number;
  imageUrl: string | null;
  title: string;
  startDate: string;
  endDate: string;
  descriptionTitle: string;
  descriptionContent: string;
  verificationMethod: string;
  likesCount: number;
  bookmarksCount: number;
  sharesCount: number;
  hashtags: string[];
}

export const getOngoingChallenge = async () => {
  const response =
    await fetcher.get<ApiResponse<Challenge | null>>('/challenges');
  if (!response.isSuccess)
    throw new ApiError({
      status: 400,
      message: response.message || '챌린지 조회에 실패했습니다.',
    });
  if (
    response.result !== null &&
    (!response.result || !Number.isInteger(response.result.challengeId))
  )
    throw new ApiError({
      status: 400,
      message: '챌린지 응답이 올바르지 않습니다.',
    });
  return response.result;
};

export interface ChallengeAttempt {
  attempt_id: number;
  challenge_id: number;
  user_id: number;
  status: string;
}

const readAttempt = (response: ApiResponse<ChallengeAttempt>) => {
  if (
    !response.isSuccess ||
    !Number.isSafeInteger(response.result?.attempt_id) ||
    response.result.attempt_id <= 0 ||
    !Number.isSafeInteger(response.result?.challenge_id) ||
    !Number.isSafeInteger(response.result?.user_id)
  )
    throw new ApiError({
      status: 400,
      message: response.message || '챌린지 참여 응답이 올바르지 않습니다.',
    });
  return response.result;
};

export const startChallenge = async (challengeId: number) =>
  readAttempt(
    await fetcher.post<ApiResponse<ChallengeAttempt>>(
      `/challenges/${challengeId}/start`,
      undefined,
      { auth: true },
    ),
  );

// The runtime controller uses an attempt id here, despite the Swagger path description.
export const stopChallenge = async (attemptId: number) =>
  readAttempt(
    await fetcher.patch<ApiResponse<ChallengeAttempt>>(
      `/challenges/${attemptId}/stop`,
      undefined,
      { auth: true },
    ),
  );

export interface ChallengeVerification {
  verification_id: number;
  attempt_id: number;
  status: string;
}

export const verifyChallenge = async (attemptId: number, images: File[]) => {
  if (!Number.isSafeInteger(attemptId) || attemptId <= 0)
    throw new Error('유효한 참여 ID가 필요합니다.');
  if (!images.length || images.length > 5)
    throw new Error('인증 이미지는 1~5장 첨부해 주세요.');
  if (images.some(file => !file.type.startsWith('image/')))
    throw new Error('이미지 파일만 첨부할 수 있습니다.');
  const body = new FormData();
  images.forEach(image => body.append('image_list', image));
  const response = await fetcher.post<ApiResponse<ChallengeVerification>>(
    `/challenges/${attemptId}/verify`,
    body,
    { auth: true },
  );
  if (
    !response.isSuccess ||
    !response.result?.verification_id ||
    response.result.attempt_id !== attemptId
  )
    throw new ApiError({
      status: 400,
      message: response.message || '인증 제출 응답이 올바르지 않습니다.',
    });
  return response.result;
};

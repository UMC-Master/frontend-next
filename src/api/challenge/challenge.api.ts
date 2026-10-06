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

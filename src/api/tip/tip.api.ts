import { fetcher } from '@/lib/api/fetcher';
import { ApiError } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';

import { NewPost, TipItem } from './tip.types';

export type {
  Author,
  Hashtag,
  TipImage,
  TipItem,
  TipsResponse,
  NewPost,
} from './tip.types';

export interface TipListResult {
  tips: TipItem[];
  hasMore: boolean;
}

export type TipSort = 'latest' | 'likes' | 'saves';

export const getTips = async ({
  pageParam,
  sorted,
  limit = 5,
}: {
  pageParam: number;
  sorted: string;
  limit?: number;
}): Promise<TipListResult> => {
  const params = new URLSearchParams({
    page: String(pageParam),
    limit: String(limit),
    sort: sorted,
  });
  const response = await fetcher.get<ApiResponse<{ tips: TipItem[] }>>(
    `/tips/sorted?${params}`,
  );
  if (!response.isSuccess || !Array.isArray(response.result?.tips)) {
    throw new ApiError({
      status: 400,
      message: response.message || '팁 목록 응답이 올바르지 않습니다.',
    });
  }
  return {
    tips: response.result.tips,
    hasMore: response.result.tips.length === limit,
  };
};

export const createPost = async (newPost: NewPost) => {
  if (newPost.imageUrls.length > 5)
    throw new Error('이미지는 최대 5장까지 첨부할 수 있습니다.');
  if (newPost.imageUrls.some(file => !file.type.startsWith('image/')))
    throw new Error('이미지 파일만 첨부할 수 있습니다.');
  const formData = new FormData();

  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  formData.append('hashtags', newPost.hashtags.join(','));

  newPost.imageUrls.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetcher.post<
    ApiResponse<{ tip: { tips_id: number } }>
  >('/tips', formData, { auth: true });
  if (!response.isSuccess || !Number.isInteger(response.result?.tip?.tips_id)) {
    throw new ApiError({
      status: 400,
      message: response.message || '등록 응답이 올바르지 않습니다.',
    });
  }
  return response.result.tip;
};

export const getSavedTips = () =>
  fetcher.get<TipListResult>('/users/saved-tips', { auth: true });

export const getTipDetail = (tipId: number) =>
  fetcher.get<TipItem>(`/tips/${tipId}`);

export const toggleLike = (tipId: number) =>
  fetcher.post<{ message: string }>(`/tips/${tipId}/like`, undefined, {
    auth: true,
  });

export const toggleBookmark = (tipId: number) =>
  fetcher.post<{ message: string }>(`/tips/${tipId}/bookmark`, undefined, {
    auth: true,
  });

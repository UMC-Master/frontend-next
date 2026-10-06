import { ApiError, fetcher } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';
import { TipsResponse } from '@/api/tip/tip.types';
export type { TipsResponse } from '@/api/tip/tip.types';

export interface GetSearchTipsParams {
  query?: string;
  tags?: string[];
  page: number;
  limit: number;
  sort?: 'latest' | 'likes' | 'saves';
}

export const getSearchTips = async ({
  query,
  tags,
  page,
  limit,
  sort = 'latest',
}: GetSearchTipsParams) => {
  const response = await fetcher.get<TipsResponse>(
    `/tips/search?${new URLSearchParams({
      ...(query && { query }),
      ...(tags?.length && { hashtags: tags.join(',') }),
      page: String(page),
      limit: String(limit),
      sort,
    })}`,
  );
  if (!response.isSuccess || !Array.isArray(response.result)) {
    throw new ApiError({
      status: 400,
      message: response.message || '검색 결과 조회에 실패했습니다.',
    });
  }
  return response;
};

export interface PopularHashtag {
  hashtag_id: number;
  name: string;
  popularity: number;
}

export const getPopularHashtags = async () => {
  const response = await fetcher.get<ApiResponse<PopularHashtag[]>>(
    '/hashtags/popular?limit=10',
  );
  if (!response.isSuccess || !Array.isArray(response.result)) {
    throw new ApiError({
      status: 400,
      message: response.message || '인기 관심사 조회에 실패했습니다.',
    });
  }
  return response.result;
};

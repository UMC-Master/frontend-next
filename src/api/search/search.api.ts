import { fetcher } from '@/lib/api/fetcher';
import { TipsResponse } from '@/api/tip/tip.types';
export type { TipsResponse } from '@/api/tip/tip.types';

export interface GetSearchTipsParams {
  query?: string;
  tags?: string[];
  page: number;
  limit: number;
  sort?: 'latest' | 'likes' | 'saves';
}

export const getSearchTips = ({ query, tags, page, limit, sort = 'latest' }: GetSearchTipsParams) =>
  fetcher.get<TipsResponse>(
    `/tips/search?${new URLSearchParams({
      ...(query && { query }),
      ...(tags?.length && { hashtags: tags.join(',') }),
      page: String(page),
      limit: String(limit),
      sort,
    })}`,
  );

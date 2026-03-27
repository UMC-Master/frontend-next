'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getSearchTips, TipsResponse } from './search.api';

interface UseSearchListParams {
  query?: string;
  tags?: string[];
  page: number;
  limit?: number;
  sort?: 'latest' | 'likes' | 'saves';
}

export const useSearchList = ({ query, tags, page, limit = 10, sort }: UseSearchListParams) =>
  useQuery<TipsResponse>({
    queryKey: ['tips', 'search', query, tags, page, sort],
    queryFn: () => getSearchTips({ query, tags, page, limit, sort }),
    placeholderData: keepPreviousData,
  });

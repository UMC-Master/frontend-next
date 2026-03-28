'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getSavedTips } from './tip.api';

export const useSavedTipList = () =>
  useInfiniteQuery({
    queryKey: ['savedTips'],
    queryFn: () => getSavedTips(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });

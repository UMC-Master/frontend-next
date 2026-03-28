'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTips } from './tip.api';

interface UseTipListParams {
  page: number;
  sortOption: string;
}

export const useTipList = ({ page, sortOption }: UseTipListParams) =>
  useQuery({
    queryKey: ['tips', page, sortOption],
    queryFn: () => getTips({ pageParam: page, sorted: sortOption }),
    placeholderData: keepPreviousData,
  });

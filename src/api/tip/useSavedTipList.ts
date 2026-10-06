'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedTips } from './tip.api';

export const useSavedTipList = () =>
  useQuery({
    queryKey: ['saved-tips'],
    queryFn: () => getSavedTips(),
  });

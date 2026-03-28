'use client';

import { useQuery } from '@tanstack/react-query';
import { getTipDetail } from './tip.api';

export const useTipDetail = (tipId: number) =>
  useQuery({
    queryKey: ['tips', tipId],
    queryFn: () => getTipDetail(tipId),
    enabled: !!tipId,
  });

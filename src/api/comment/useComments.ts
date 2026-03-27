'use client';

import { useQuery } from '@tanstack/react-query';
import { getComments } from './comment.api';

export const useComments = (tipId: number) =>
  useQuery({
    queryKey: ['comments', tipId],
    queryFn: () => getComments(tipId),
  });

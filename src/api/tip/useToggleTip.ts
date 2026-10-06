'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark, toggleLike } from './tip.api';

export const useToggleLike = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(tipId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['tips'] });
    },
  });
};

export const useToggleBookmark = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleBookmark(tipId),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tips'] }),
        queryClient.invalidateQueries({ queryKey: ['saved-tips'] }),
      ]);
    },
  });
};

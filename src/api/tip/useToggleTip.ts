'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark, toggleLike } from './tip.api';

export const useToggleLike = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(tipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tips', tipId] });
    },
  });
};

export const useToggleBookmark = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleBookmark(tipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tips', tipId] });
    },
  });
};

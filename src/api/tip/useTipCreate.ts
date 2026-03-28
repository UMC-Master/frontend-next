'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createPost, NewPost } from './tip.api';

/**
 * @param onSuccess 게시글 등록 성공 시 실행할 콜백 (모달 오픈 등)
 */
export const useTipCreate = (onSuccess?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),
    onSuccess: () => {
      onSuccess?.();
      router.replace('/community');
    },
  });
};

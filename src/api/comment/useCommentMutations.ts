'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, editComment, getComments } from './comment.api';

export const useAddComment = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => addComment(tipId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', tipId] });
    },
  });
};

/**
 * @param userId 현재 로그인한 사용자 ID. auth store 연동 후 내부에서 읽도록 변경하세요.
 */
export const useDeleteComment = (tipId: number, userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const comments = await getComments(tipId);
      const comment = comments.find((c) => c.comment_id === commentId);
      if (comment?.user.user_id !== userId) {
        throw new Error('본인의 댓글만 삭제할 수 있습니다.');
      }
      return deleteComment(tipId, commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', tipId] });
    },
  });
};

/**
 * @param userId 현재 로그인한 사용자 ID. auth store 연동 후 내부에서 읽도록 변경하세요.
 */
export const useUpdateComment = (tipId: number, userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, newComment }: { commentId: number; newComment: string }) => {
      const comments = await getComments(tipId);
      const comment = comments.find((c) => c.comment_id === commentId);
      if (comment?.user.user_id !== userId) {
        throw new Error('본인의 댓글만 수정할 수 있습니다.');
      }
      return editComment(tipId, commentId, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', tipId] });
    },
  });
};

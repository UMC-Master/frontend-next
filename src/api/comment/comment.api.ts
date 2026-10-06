import { ApiError, fetcher } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';

export interface Comment {
  comment_id: number;
  tips_id: number;
  user: {
    user_id: number;
    nickname: string;
    profile_image_url?: string | null;
  };
  comment: string;
  created_at: string;
}

export const getComments = async (tipId: number) => {
  const response = await fetcher.get<ApiResponse<Comment[]>>('/comments', {
    auth: true,
  });
  if (!response.isSuccess || !Array.isArray(response.result))
    throw new ApiError({
      status: 400,
      message: response.message || '댓글 조회에 실패했습니다.',
    });
  return response.result.filter(comment => comment.tips_id === tipId);
};

const readComment = (response: ApiResponse<{ data: Comment }>) => {
  if (!response.isSuccess || !response.result?.data)
    throw new ApiError({
      status: 400,
      message: response.message || '댓글 저장에 실패했습니다.',
    });
  return response.result.data;
};

export const addComment = async (tipId: number, comment: string) =>
  readComment(
    await fetcher.post<ApiResponse<{ data: Comment }>>(
      `/tips/${tipId}/comments`,
      { comment },
      { auth: true },
    ),
  );

export const editComment = async (
  tipId: number,
  commentId: number,
  newComment: string,
) =>
  readComment(
    await fetcher.put<ApiResponse<{ data: Comment }>>(
      `/tips/${tipId}/comments/${commentId}`,
      { comment: newComment },
      { auth: true },
    ),
  );

export const deleteComment = async (tipId: number, commentId: number) => {
  const response = await fetcher.delete<{
    isSuccess: boolean;
    message: string;
  }>(`/tips/${tipId}/comments/${commentId}`, { auth: true });
  if (!response.isSuccess)
    throw new ApiError({ status: 400, message: response.message });
};

import { fetcher } from '@/lib/api/fetcher';

export interface Comment {
  comment_id: number;
  tips_id: number;
  user: {
    user_id: number;
    nickname: string;
    profileImageUrl?: string | null;
  };
  comment: string;
  created_at: string;
}

export const getComments = async (tipId: number) => {
  const data = await fetcher.get<Comment[]>('/comments', { auth: true });
  return data.filter((comment) => comment.tips_id === tipId);
};

export const addComment = (tipId: number, comment: string) =>
  fetcher.post<Comment>(`/tips/${tipId}/comments`, { comment }, { auth: true });

export const editComment = (tipId: number, commentId: number, newComment: string) =>
  fetcher.put<Comment>(`/tips/${tipId}/comments/${commentId}`, { comment: newComment }, { auth: true });

export const deleteComment = (tipId: number, commentId: number) =>
  fetcher.delete<void>(`/tips/${tipId}/comments/${commentId}`, { auth: true });

import { fetcher } from '@/lib/api/fetcher';

import { NewPost, TipItem } from './tip.types';

export type { Author, Hashtag, TipImage, TipItem, TipsResponse, NewPost } from './tip.types';

export interface TipListResult {
  tips: TipItem[];
  hasMore: boolean;
}

export const getTips = ({ pageParam, sorted }: { pageParam: number; sorted: string }) =>
  fetcher.get<TipListResult>(`/tips/sorted?page=${pageParam}&limit=5&sort=${sorted}`);

export const createPost = (newPost: NewPost) => {
  const formData = new FormData();

  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  formData.append('hashtags', newPost.hashtags.join(','));

  if (newPost.userId !== undefined) {
    formData.append('userId', String(newPost.userId));
  }

  newPost.imageUrls.forEach((file) => {
    formData.append('files', file);
  });

  return fetcher.post<void>('/tips', formData, { auth: true });
};

export const getSavedTips = () =>
  fetcher.get<TipListResult>('/users/saved-tips', { auth: true });

export const getTipDetail = (tipId: number) =>
  fetcher.get<TipItem>(`/tips/${tipId}`);

export const toggleLike = (tipId: number) =>
  fetcher.post<{ message: string }>(`/tips/${tipId}/like`, undefined, { auth: true });

export const toggleBookmark = (tipId: number) =>
  fetcher.post<{ message: string }>(`/tips/${tipId}/bookmark`, undefined, { auth: true });

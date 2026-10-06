import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getTipDetail, toggleLike, toggleBookmark, deleteTip } from './tip.api';
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from '@/api/comment/comment.api';

afterEach(() => vi.restoreAllMocks());
describe('tip detail and comments contract', () => {
  it('authenticates and unwraps detail with server reaction state', async () => {
    const tip = {
      tipId: 7,
      user: { userId: 2 },
      isLiked: true,
      isBookmarked: false,
      likesCount: 9,
      media: [],
      hashtags: [],
    };
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: tip });
    expect(await getTipDetail(7)).toEqual(tip);
    expect(get).toHaveBeenCalledWith('/tips/7', { auth: true });
  });
  it.each([
    ['like', toggleLike],
    ['bookmark', toggleBookmark],
  ] as const)('authenticates %s toggles', async (path, mutate) => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, message: 'done' });
    await mutate(7);
    expect(post).toHaveBeenCalledWith(`/tips/7/${path}`, undefined, {
      auth: true,
    });
  });
  it('rejects reaction failures even when HTTP succeeds', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({
      isSuccess: false,
      message: 'failed',
    });
    await expect(toggleLike(7)).rejects.toThrow('failed');
  });
  it('deletes a tip with authentication', async () => {
    const remove = vi
      .spyOn(fetcher, 'delete')
      .mockResolvedValue({ isSuccess: true });
    await deleteTip(7);
    expect(remove).toHaveBeenCalledWith('/tips/7', { auth: true });
  });
  it('unwraps the complete comment array then filters by tip id', async () => {
    const comment = {
      comment_id: 1,
      tips_id: 7,
      comment: '내용',
      user: { user_id: 2 },
    };
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({
        isSuccess: true,
        result: [comment, { ...comment, comment_id: 2, tips_id: 8 }],
      });
    expect(await getComments(7)).toEqual([comment]);
    expect(get).toHaveBeenCalledWith('/comments', { auth: true });
  });
  it('unwraps result.data for comment creation and editing', async () => {
    const comment = { comment_id: 1, comment: '내용' };
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, result: { data: comment } });
    const put = vi
      .spyOn(fetcher, 'put')
      .mockResolvedValue({ isSuccess: true, result: { data: comment } });
    expect(await addComment(7, '내용')).toEqual(comment);
    expect(await editComment(7, 1, '내용')).toEqual(comment);
    expect(post).toHaveBeenCalledWith(
      '/tips/7/comments',
      { comment: '내용' },
      { auth: true },
    );
    expect(put).toHaveBeenCalledWith(
      '/tips/7/comments/1',
      { comment: '내용' },
      { auth: true },
    );
  });
  it('uses the nested authenticated comment deletion path', async () => {
    const remove = vi
      .spyOn(fetcher, 'delete')
      .mockResolvedValue({ isSuccess: true });
    await deleteComment(7, 1);
    expect(remove).toHaveBeenCalledWith('/tips/7/comments/1', { auth: true });
  });
});

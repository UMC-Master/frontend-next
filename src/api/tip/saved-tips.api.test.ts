import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getSavedTips } from './tip.api';

afterEach(() => vi.restoreAllMocks());
describe('saved tips contract', () => {
  it('authenticates and normalizes singular count fields from the saved response', async () => {
    const tip = {
      tipId: 2,
      title: '저장 팁',
      content: '내용',
      author: { userId: 1 },
      imageUrls: [],
      likeCount: 8,
      saveCount: 3,
      createdAt: '2026-10-01T00:00:00Z',
    };
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: [tip] });
    expect(await getSavedTips()).toMatchObject({
      tips: [{ tipId: 2, likesCount: 8, savesCount: 3, hashtags: [] }],
      hasMore: false,
    });
    expect(get).toHaveBeenCalledWith('/users/saved-tips', { auth: true });
  });
  it('keeps an empty saved array empty', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({ isSuccess: true, result: [] });
    expect(await getSavedTips()).toEqual({ tips: [], hasMore: false });
  });
});

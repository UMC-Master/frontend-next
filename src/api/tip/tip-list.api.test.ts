import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getTips } from './tip.api';
import { toTipCard } from './tip.mapper';
import type { TipItem } from './tip.types';

afterEach(() => vi.restoreAllMocks());
const tip: TipItem = {
  tipId: 7,
  title: '실제 팁',
  content: '본문',
  author: { userId: 2, nickname: '작성자', profileImageUrl: null },
  hashtags: [],
  imageUrls: [],
  likesCount: 3,
  savesCount: 2,
  createdAt: '',
  updatedAt: '',
};

describe('sorted tips API', () => {
  it('allows the next page only when the requested page is full', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({
      isSuccess: true,
      result: {
        tips: Array.from({ length: 10 }, (_, i) => ({ ...tip, tipId: i + 1 })),
      },
    });
    expect(
      (await getTips({ pageParam: 1, sorted: 'latest', limit: 10 })).hasMore,
    ).toBe(true);
  });
  it.each(['latest', 'likes', 'saves'])(
    'unwraps result.tips for %s',
    async sort => {
      const get = vi
        .spyOn(fetcher, 'get')
        .mockResolvedValue({ isSuccess: true, result: { tips: [tip] } });
      expect(await getTips({ pageParam: 2, sorted: sort, limit: 10 })).toEqual({
        tips: [tip],
        hasMore: false,
      });
      expect(get).toHaveBeenCalledWith(
        `/tips/sorted?page=2&limit=10&sort=${sort}`,
      );
    },
  );
  it('returns an empty list without mock data', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({
      isSuccess: true,
      result: { tips: [] },
    });
    expect(await getTips({ pageParam: 1, sorted: 'latest' })).toEqual({
      tips: [],
      hasMore: false,
    });
  });
  it('rejects malformed list responses', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({ isSuccess: true, result: [] });
    await expect(getTips({ pageParam: 1, sorted: 'latest' })).rejects.toThrow();
  });
  it('uses actual ids and counts with an image placeholder', () => {
    expect(toTipCard(tip)).toMatchObject({
      id: 7,
      href: '/tips/7',
      title: '실제 팁',
      imageSrc: '/images/tip-placeholder.svg',
      badges: [
        { type: 'like', count: 3 },
        { type: 'save', count: 2 },
      ],
    });
    expect(
      toTipCard({
        ...tip,
        imageUrls: [
          { media_type: 'IMAGE', media_url: 'https://bucket.example/tip.jpg' },
        ],
      }).imageSrc,
    ).toBe('https://bucket.example/tip.jpg');
  });
});

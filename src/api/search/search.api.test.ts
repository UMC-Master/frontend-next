import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getSearchTips, getPopularHashtags } from './search.api';

afterEach(() => vi.restoreAllMocks());
describe('search API contract', () => {
  it('encodes search terms, hashtags, page, limit and sort', async () => {
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: [] });
    await getSearchTips({
      query: '청소 & 정리',
      tags: ['주방', '욕실'],
      page: 2,
      limit: 10,
      sort: 'saves',
    });
    const params = new URLSearchParams(
      String(get.mock.calls[0][0]).split('?')[1],
    );
    expect(Object.fromEntries(params)).toEqual({
      query: '청소 & 정리',
      hashtags: '주방,욕실',
      page: '2',
      limit: '10',
      sort: 'saves',
    });
  });
  it('supports hashtag-only searches without a query', async () => {
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: [] });
    await getSearchTips({ tags: ['청소'], page: 1, limit: 10 });
    expect(String(get.mock.calls[0][0])).not.toContain('query=');
  });
  it('unwraps the actual popular hashtag array', async () => {
    const tags = [{ hashtag_id: 3, name: '청소', popularity: 4 }];
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: tags });
    expect(await getPopularHashtags()).toEqual(tags);
    expect(get).toHaveBeenCalledWith('/hashtags/popular?limit=10');
  });
  it('rejects malformed search results', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({
      isSuccess: true,
      result: { tips: [] },
    });
    await expect(
      getSearchTips({ query: 'x', page: 1, limit: 10 }),
    ).rejects.toThrow();
  });
});

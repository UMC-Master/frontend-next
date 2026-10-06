import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { createPost } from './tip.api';

afterEach(() => vi.restoreAllMocks());
describe('tip create API contract', () => {
  it('sends authenticated multipart data and returns the created id', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, result: { tip: { tips_id: 42 } } });
    const file = new File(['image'], 'tip.jpg', { type: 'image/jpeg' });
    expect(
      await createPost({
        userId: 999,
        title: '제목',
        content: '본문',
        hashtags: ['청소', '정리'],
        imageUrls: [file],
      }),
    ).toEqual({ tips_id: 42 });
    const [path, body, options] = post.mock.calls[0];
    expect(path).toBe('/tips');
    expect(options).toEqual({ auth: true });
    const data = body as FormData;
    expect(data.get('title')).toBe('제목');
    expect(data.get('content')).toBe('본문');
    expect(data.get('hashtags')).toBe('청소,정리');
    expect(data.has('userId')).toBe(false);
    expect((data.getAll('files')[0] as File).name).toBe('tip.jpg');
  });
  it('rejects too many images before submitting', async () => {
    const post = vi.spyOn(fetcher, 'post');
    const images = Array.from(
      { length: 6 },
      () => new File(['x'], 'x.png', { type: 'image/png' }),
    );
    await expect(
      createPost({
        title: 'title',
        content: 'content',
        hashtags: [],
        imageUrls: images,
      }),
    ).rejects.toThrow('최대 5장');
    expect(post).not.toHaveBeenCalled();
  });
  it('rejects a success response without the created tip id', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({
      isSuccess: true,
      result: {},
    });
    await expect(
      createPost({
        title: 'title',
        content: 'content',
        hashtags: ['청소'],
        imageUrls: [],
      }),
    ).rejects.toThrow();
  });
});

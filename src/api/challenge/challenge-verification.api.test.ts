import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { verifyChallenge } from './challenge.api';

afterEach(() => vi.restoreAllMocks());
const image = () => new File(['image'], 'verify.jpg', { type: 'image/jpeg' });
describe('challenge verification contract', () => {
  it('submits images using the attempt id and image_list field', async () => {
    const verification = {
      verification_id: 9,
      attempt_id: 42,
      status: 'PENDING',
    };
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, result: verification });
    expect(await verifyChallenge(42, [image(), image()])).toEqual(verification);
    const [path, body, options] = post.mock.calls[0];
    expect(path).toBe('/challenges/42/verify');
    expect(options).toEqual({ auth: true });
    expect((body as FormData).getAll('image_list')).toHaveLength(2);
    expect((body as FormData).has('files')).toBe(false);
  });
  it('rejects zero images and more than five before sending a request', async () => {
    const post = vi.spyOn(fetcher, 'post');
    await expect(verifyChallenge(42, [])).rejects.toThrow('1~5장');
    await expect(
      verifyChallenge(42, Array.from({ length: 6 }, image)),
    ).rejects.toThrow('1~5장');
    expect(post).not.toHaveBeenCalled();
  });
  it('rejects non-image files', async () => {
    await expect(
      verifyChallenge(42, [
        new File(['text'], 'file.txt', { type: 'text/plain' }),
      ]),
    ).rejects.toThrow('이미지 파일');
  });
  it('does not accept a verification for a different attempt', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({
      isSuccess: true,
      result: { verification_id: 9, attempt_id: 43, status: 'PENDING' },
    });
    await expect(verifyChallenge(42, [image()])).rejects.toThrow();
  });
});

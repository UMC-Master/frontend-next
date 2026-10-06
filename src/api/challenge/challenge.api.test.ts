import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getOngoingChallenge } from './challenge.api';

afterEach(() => vi.restoreAllMocks());
describe('ongoing challenge API contract', () => {
  it('unwraps one ongoing challenge instead of pretending it is an array', async () => {
    const challenge = { challengeId: 1, title: '진행 중 챌린지' };
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: challenge });
    expect(await getOngoingChallenge()).toEqual(challenge);
    expect(get).toHaveBeenCalledWith('/challenges');
  });
  it('allows an empty result without falling back to mock cards', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({
      isSuccess: true,
      result: null,
    });
    expect(await getOngoingChallenge()).toBeNull();
  });
  it('rejects unexpected response shapes', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({ isSuccess: true, result: [] });
    await expect(getOngoingChallenge()).rejects.toThrow();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getProfile, signIn, signInWithKakao } from './auth.api';

afterEach(() => vi.restoreAllMocks());

describe('login API contract', () => {
  it('sends email credentials and extracts the response tokens', async () => {
    const tokens = { accessToken: 'access', refreshToken: 'refresh' };
    const post = vi.spyOn(fetcher, 'post').mockResolvedValue({ isSuccess: true, result: tokens });
    expect(await signIn('user@example.com', 'password')).toEqual(tokens);
    expect(post).toHaveBeenCalledWith('/login', { email: 'user@example.com', password: 'password' });
  });

  it('exchanges a Kakao authorization code through the backend', async () => {
    const post = vi.spyOn(fetcher, 'post').mockResolvedValue({ isSuccess: true, result: { accessToken: 'access', refreshToken: 'refresh', user: {} } });
    await signInWithKakao('single-use-code');
    expect(post).toHaveBeenCalledWith('/login/kakao', { code: 'single-use-code' });
  });

  it('rejects success HTTP responses with missing tokens', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({ isSuccess: true, result: { accessToken: 'access' } });
    await expect(signIn('user@example.com', 'password')).rejects.toMatchObject({ status: 400 });
  });

  it('loads profile information with authentication', async () => {
    const profile = { user_id: 1, nickname: '홈마스터' };
    const get = vi.spyOn(fetcher, 'get').mockResolvedValue({ isSuccess: true, result: profile });
    expect(await getProfile()).toEqual(profile);
    expect(get).toHaveBeenCalledWith('/profile', { auth: true });
  });
});

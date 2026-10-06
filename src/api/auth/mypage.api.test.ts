import { afterEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
      removeItem: (key: string) => {
        values.delete(key);
      },
    },
  });
});
import { QueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api/fetcher';
import { getStatistics, deactivateAccount } from './auth.api';
import { clearUserSession } from '@/features/auth/session';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useSignupStore } from '@/features/auth/sign-up/stores/signupStore';
import { useTipWriteStore } from '@/features/tip-create/stores/tipWriteStore';
import { useChallengeAttemptStore } from '@/features/challenges/stores/challengeAttemptStore';

afterEach(() => vi.restoreAllMocks());
describe('mypage contract and logout', () => {
  it('authenticates statistics and unwraps the current server fields', async () => {
    const statistics = {
      quizScore: 85,
      tipsSharedCount: 12,
      likesReceived: 45,
    };
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({ isSuccess: true, result: statistics });
    expect(await getStatistics()).toEqual(statistics);
    expect(get).toHaveBeenCalledWith('/statistics', { auth: true });
  });
  it('deactivates only through an authenticated request', async () => {
    const remove = vi
      .spyOn(fetcher, 'delete')
      .mockResolvedValue({ isSuccess: true, message: 'inactive' });
    await deactivateAccount();
    expect(remove).toHaveBeenCalledWith('/deactivate', { auth: true });
  });
  it('surfaces failure without silently clearing authentication', async () => {
    useAuthStore
      .getState()
      .setTokens({ accessToken: 'access', refreshToken: 'refresh' });
    vi.spyOn(fetcher, 'delete').mockResolvedValue({
      isSuccess: false,
      message: 'failed',
    });
    await expect(deactivateAccount()).rejects.toThrow('failed');
    expect(useAuthStore.getState().accessToken).toBe('access');
    useAuthStore.getState().clearTokens();
  });
  it('clears tokens, cached user data, attempts, signup and post drafts', async () => {
    const client = new QueryClient();
    client.setQueryData(['profile'], { user_id: 1 });
    useAuthStore
      .getState()
      .setTokens({ accessToken: 'access', refreshToken: 'refresh' });
    useSignupStore.getState().actions.setPassword('secret');
    useTipWriteStore.getState().setTitle('private draft');
    useChallengeAttemptStore
      .getState()
      .setAttempt({
        attempt_id: 42,
        user_id: 1,
        challenge_id: 1,
        status: 'START',
      });
    await clearUserSession(client);
    expect(useAuthStore.getState()).toMatchObject({
      accessToken: null,
      refreshToken: null,
    });
    expect(client.getQueryData(['profile'])).toBeUndefined();
    expect(useSignupStore.getState().data.password).toBe('');
    expect(useTipWriteStore.getState().title).toBe('');
    expect(useChallengeAttemptStore.getState().attempts).toEqual({});
  });
});

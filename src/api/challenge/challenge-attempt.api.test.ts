import { afterEach, describe, expect, it, vi } from 'vitest';
const storage = vi.hoisted(() => {
  const values = new Map<string, string>();
  const memory = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: memory,
    configurable: true,
  });
  return memory;
});
import { fetcher } from '@/lib/api/fetcher';
import { startChallenge, stopChallenge } from './challenge.api';
import {
  attemptKey,
  useChallengeAttemptStore,
} from '@/features/challenges/stores/challengeAttemptStore';

afterEach(() => {
  vi.restoreAllMocks();
  useChallengeAttemptStore.getState().clear();
});
const attempt = {
  attempt_id: 42,
  challenge_id: 1,
  user_id: 7,
  status: 'START',
};
describe('challenge attempt contract', () => {
  it('starts by challenge id and returns the different attempt id', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, result: attempt });
    expect(await startChallenge(1)).toEqual(attempt);
    expect(post).toHaveBeenCalledWith('/challenges/1/start', undefined, {
      auth: true,
    });
  });
  it('stops by attempt id, not challenge id', async () => {
    const patch = vi.spyOn(fetcher, 'patch').mockResolvedValue({
      isSuccess: true,
      result: { ...attempt, status: 'CANCELED' },
    });
    expect((await stopChallenge(42)).status).toBe('CANCELED');
    expect(patch).toHaveBeenCalledWith('/challenges/42/stop', undefined, {
      auth: true,
    });
  });
  it('isolates known participation by account and updates cancellation', () => {
    const store = useChallengeAttemptStore.getState();
    store.setAttempt(attempt);
    expect(
      JSON.parse(storage.getItem('homemaster-challenge-attempts')!).state
        .attempts[attemptKey(7, 1)].attempt_id,
    ).toBe(42);
    expect(
      useChallengeAttemptStore.getState().attempts[attemptKey(8, 1)],
    ).toBeUndefined();
    store.setAttempt({ ...attempt, status: 'CANCELED' });
    expect(
      useChallengeAttemptStore.getState().attempts[attemptKey(7, 1)].status,
    ).toBe('CANCELED');
  });
  it('does not accept an id-less success response', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({
      isSuccess: true,
      result: {},
    });
    await expect(startChallenge(1)).rejects.toThrow();
  });
});

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ChallengeAttempt } from '@/api/challenge/challenge.api';

interface AttemptState {
  attempts: Record<string, ChallengeAttempt>;
  setAttempt: (attempt: ChallengeAttempt) => void;
  clear: () => void;
}

export const attemptKey = (userId: number, challengeId: number) =>
  `${userId}:${challengeId}`;

export const useChallengeAttemptStore = create<AttemptState>()(
  persist(
    set => ({
      attempts: {},
      setAttempt: attempt =>
        set(state => ({
          attempts: {
            ...state.attempts,
            [attemptKey(attempt.user_id, attempt.challenge_id)]: attempt,
          },
        })),
      clear: () => set({ attempts: {} }),
    }),
    {
      name: 'homemaster-challenge-attempts',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ attempts: state.attempts }),
    },
  ),
);

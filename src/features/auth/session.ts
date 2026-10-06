import type { QueryClient } from '@tanstack/react-query';
import { useAuthStore } from './stores/authStore';
import { useSignupStore } from './sign-up/stores/signupStore';
import { useChallengeAttemptStore } from '@/features/challenges/stores/challengeAttemptStore';
import { useTipWriteStore } from '@/features/tip-create/stores/tipWriteStore';

export const clearUserSession = async (queryClient: QueryClient) => {
  useAuthStore.getState().clearTokens();
  useSignupStore.getState().actions.reset();
  useChallengeAttemptStore.getState().clear();
  useTipWriteStore.getState().reset();
  await queryClient.cancelQueries();
  queryClient.clear();
};

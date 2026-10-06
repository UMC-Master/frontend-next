import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      setTokens: tokens => set(tokens),
      setAccessToken: accessToken => set({ accessToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'homemaster-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }),
    },
  ),
);

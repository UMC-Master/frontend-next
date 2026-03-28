import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/lib/api/fetcher';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1분
        retry: (failureCount, error) => {
          // 4xx 에러는 재시도하지 않도록
          if (error instanceof ApiError && error.status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });

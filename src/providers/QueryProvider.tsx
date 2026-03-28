'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query/query-client';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // 요청마다 새 QueryClient를 생성해 서버 간 상태가 공유되지 않도록
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

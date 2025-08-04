'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Thời gian cache data
            staleTime: 60 * 1000, // 1 minute
            // Thời gian giữ data trong cache khi không còn component nào sử dụng
            gcTime: 5 * 60 * 1000, // 5 minutes (cũ là cacheTime)
            // Retry khi gặp lỗi
            retry: 1,
            // Refetch khi window focus
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry khi mutation bị lỗi
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
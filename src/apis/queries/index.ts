import { clearAuth } from '@/util/auth';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queriesDefaultOptions = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
  retry: false,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: queriesDefaultOptions,
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 0;

        if (status === 403) {
          //TODO: refresh token
          clearAuth();
        }
      }
    },
  }),
});
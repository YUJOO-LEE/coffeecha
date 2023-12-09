import { QueryClient } from '@tanstack/react-query';

export const queriesDefaultOptions = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60,
  retry: false,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: queriesDefaultOptions,
  },
});
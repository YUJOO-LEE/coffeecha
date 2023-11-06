import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const defaultOption = {
  refetchOnWindowFocus: false,
  retry: false,
};
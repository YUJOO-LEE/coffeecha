import { authApi } from '@/apis';
import { TokenInfo } from '@/apis/swagger/data-contracts';
import { QueryClient, useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

const QueryKey = 'auth';

export const useAuth = (): UseQueryResult<{ accessToken: string; refreshToken: string, grandType: string }> => {
  return useQuery([QueryKey], {
    initialData: () => {
      try {
        const { accessToken, refreshToken, grandType } = JSON.parse(
          localStorage.getItem(QueryKey) || '{}'
        );

        return { accessToken, refreshToken, grandType };
      } catch (e) {
        throw new Error('Failed to load user info');
      }
    },
  });
};

export const setAuth = (queryClient: QueryClient, partialResponse: Partial<TokenInfo>) => {
  queryClient.setQueryData([QueryKey], { ...partialResponse });

  const authData = { ...(queryClient.getQueryData<TokenInfo>([QueryKey]) || {}), ...partialResponse };
  localStorage.setItem(QueryKey, JSON.stringify(authData));
};

export const clearAuth = (queryClient: QueryClient): void => {
  queryClient.setQueryData([QueryKey], null);
  localStorage.removeItem(QueryKey);
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(authApi.token, {
    onSuccess: (response) => {
      setAuth(queryClient, response.data);
    },
  });
};

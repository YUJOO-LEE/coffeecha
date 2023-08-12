import { clientApi } from '@/apis';
import { ClientResponse } from '@/apis/swagger/data-contracts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const QueryKey = 'client';

const defaultOption = {
  refetchOnWindowFocus: false,
};

export const useGetClientList = (userId: number): UseQueryResult<ClientResponse[], unknown> => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await clientApi.getClient(userId);
      return data;
    },
    defaultOption
  );
};
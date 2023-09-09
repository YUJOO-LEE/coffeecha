import { menuApi } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const QueryKey = 'menu';

const defaultOption = {
  refetchOnWindowFocus: false,
};

export const useGetClientMenuList = (clientId: number) => {
  return useQuery(
    [QueryKey, 'list', clientId],
    async () => {
      const { data } = await menuApi.getClientMenuAll(clientId);
      return data;
    },
    defaultOption
  );
};
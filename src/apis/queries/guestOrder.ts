import { guestOrderApi } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const QueryKey = 'guest_order';

const defaultOption = {
  refetchOnWindowFocus: true,
};

export const useGetClientInfoForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'client'],
    async () => {
      const { data } = await guestOrderApi.getClientByKey(clientKey);
      return data;
    },
    defaultOption
  );
};

export const useGetClientMenuForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'menu'],
    async () => {
      const { data } = await guestOrderApi.getOpenClientAllMenus(clientKey);
      return data;
    },
    defaultOption
  );
};
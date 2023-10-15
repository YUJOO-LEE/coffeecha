import { guestOrderApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { useQuery } from '@tanstack/react-query';

export const QueryKey = 'guest_order';

export const useGetClientInfoForGuest = (clientKey: string, enabled: boolean) => {
  return useQuery(
    [QueryKey, 'client'],
    async () => {
      const { data } = await guestOrderApi.getClientByKey(clientKey);
      return data;
    },
    { ...defaultOption, refetchOnWindowFocus: true, enabled }
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
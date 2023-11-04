import { guestOrderApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { OrderRequest, OrderResponse } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'guest_order';
const queryOptions = {
  refetchOnWindowFocus: true,
};

export const useGetCategoryForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'category'],
    async () => {
      const { data } = await guestOrderApi.orderAllCategories(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions }
  );
};

export const useGetClientInfoForGuest = (clientKey: string, enabled: boolean) => {
  return useQuery(
    [QueryKey, 'client'],
    async () => {
      const { data } = await guestOrderApi.getClientByKey(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions, enabled }
  );
};

export const useGetClientMenuForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'menu'],
    async () => {
      const { data } = await guestOrderApi.getOpenClientAllMenus(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions },
  );
};

export const useOrder = (clientKey: string): UseMutationResult<
  AxiosResponse<OrderResponse>, unknown, OrderRequest
> => useMutation((data) => guestOrderApi.customerOrder(clientKey, data));
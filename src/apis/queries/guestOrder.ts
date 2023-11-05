import { guestOrderApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { OrderRequest, OrderResponse } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'guest_order';
const queryOptions = {
  refetchOnWindowFocus: true,
};

export const useGetCategoryForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'category', clientKey],
    async () => {
      const { data } = await guestOrderApi.orderAllCategories(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions }
  );
};

export const useGetClientInfoForGuest = (clientKey: string, enabled: boolean) => {
  return useQuery(
    [QueryKey, 'client', clientKey],
    async () => {
      const { data } = await guestOrderApi.getClientByKey(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions, enabled }
  );
};

export const useGetClientMenuForGuest = (clientKey: string) => {
  return useQuery(
    [QueryKey, 'menu', clientKey],
    async () => {
      const { data } = await guestOrderApi.getOpenClientAllMenus(clientKey);
      return data;
    },
    { ...defaultOption, ...queryOptions },
  );
};

export const useOrder = (clientKey: string): UseMutationResult<
  AxiosResponse<OrderResponse>, unknown, OrderRequest
> => {
  const queryClient = useQueryClient();

  return useMutation((data) => guestOrderApi.customerOrder(clientKey, data), {
    onError: () => {
      queryClient.invalidateQueries([QueryKey]);
    },
  });
};

export const useGetGuestOrderList = (name: string, phone: string, enabled: boolean) => {
  return useQuery(
    [QueryKey, 'list', name, phone],
    async () => {
      const { data } = await guestOrderApi.guestAllOrders({ name, phone });
      return data;
    },
    { ...defaultOption, ...queryOptions, enabled },
  );
};

export const useGetGuestOrderDetail = (orderKey?: string) => {
  return useQuery(
    [QueryKey, 'detail', orderKey],
    async () => {
      const { data } = await guestOrderApi.guestOrderDetail(orderKey!);
      return data;
    },
    { ...defaultOption, ...queryOptions, enabled: !!orderKey },
  );
};
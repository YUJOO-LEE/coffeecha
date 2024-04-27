import { clientApi, orderApi } from '@/apis';
import { OrderStatus } from '@/apis/swagger/data-contracts.ts';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const OrderQueryKey = 'order';
const queryOptions = {
  refetchInterval: 60000,
};

export const useGetOrderList = (clientId: number, limit: number, statusString: string | null) => {
  const status = statusString && Object.values(OrderStatus).find((statusEnum) => statusEnum === statusString) ? statusString as OrderStatus : undefined;

  return useInfiniteQuery(
    [OrderQueryKey, 'list', clientId],
    async ({ pageParam = 0 }) => {
      const { data } = await clientApi.getClientOrders(clientId, { offset: pageParam, limit, status });
      return data;
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.orders.length < limit) return;
        return limit * allPages.length;
      },
    },
  );
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(orderApi.updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([OrderQueryKey, 'list']);
    },
  });
};
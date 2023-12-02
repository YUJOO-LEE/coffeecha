import { clientApi, orderApi } from '@/apis';
import { defaultOption } from '@/apis/queries';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const OrderQueryKey = 'order';
const queryOptions = {
  refetchInterval: 60000,
};

export const useGetOrderList = (clientId: number, limit: number) => {
  return useInfiniteQuery(
    [OrderQueryKey, 'list', clientId],
    async ({ pageParam = 0 }) => {
      const { data } = await clientApi.getClientOrders(clientId, { offset: pageParam, limit });
      return data;
    },
    {
      ...defaultOption,
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.orders.length < limit) return;
        return limit * allPages.length;
      },
    }
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
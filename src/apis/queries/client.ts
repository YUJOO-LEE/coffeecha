import { clientApi, orderApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { ClientResponse, SaveClientRequest, SaveResponse, UpdateClientRequest } from '@/apis/swagger/data-contracts';
import {
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'client';

export const useGetClientList = (): UseQueryResult<ClientResponse[]> => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await clientApi.getUserClients();
      return data;
    },
    defaultOption
  );
};

export const useGetClientDetail = (clientId: number, disabled?: boolean): UseQueryResult<ClientResponse> => {
  return useQuery(
    [QueryKey, 'detail', clientId],
    async () => {
      const { data } = await clientApi.getClientById(clientId);
      return data;
    },
    { ...defaultOption, enabled: !disabled },
  );
};

export const useAddClient = (): UseMutationResult<AxiosResponse<SaveResponse>, unknown, SaveClientRequest> => {
  const queryClient = useQueryClient();

  return useMutation(clientApi.saveClient, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useUpdateClient = (): UseMutationResult<AxiosResponse<void>, unknown, { clientId: number, data: UpdateClientRequest }> => {
  const queryClient = useQueryClient();

  return useMutation(({ clientId, data }) => clientApi.updateClient(clientId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
      queryClient.invalidateQueries([QueryKey, 'detail']);
    },
  });
};

export const useDeleteClient = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(clientApi.deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useOpenClient = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(clientApi.clientOpen, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
      queryClient.invalidateQueries([QueryKey, 'detail']);
    },
  });
};

export const useCloseClient = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(clientApi.clientClose, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
      queryClient.invalidateQueries([QueryKey, 'detail']);
    },
  });
};

export const useGetOrderList = (clientId: number, limit: number) => {
  return useInfiniteQuery(
    [QueryKey, 'list', clientId],
    async ({ pageParam = 0 }) => {
      const { data } = await clientApi.getClientOrders(clientId, { offset: pageParam, limit });
      return data;
    },
    {
      ...defaultOption,
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
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};
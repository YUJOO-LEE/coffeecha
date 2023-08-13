import { clientApi } from '@/apis';
import { ClientResponse, SaveClientRequest, SaveResponse, UpdateClientRequest } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'client';

const defaultOption = {
  refetchOnWindowFocus: false,
};

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

export const useGetClientDetail = (clientId: number): UseQueryResult<ClientResponse> => {
  return useQuery(
    [QueryKey, 'detail', clientId],
    async () => {
      const { data } = await clientApi.getClient(clientId);
      return data;
    },
    defaultOption
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
import { clientApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { ClientResponse, SaveClientRequest, SaveResponse, UpdateClientRequest } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
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
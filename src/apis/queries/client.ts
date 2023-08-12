import { clientApi } from '@/apis';
import { ClientResponse, SaveClientRequest, SaveResponse } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'client';

const defaultOption = {
  refetchOnWindowFocus: false,
};

export const useGetClientList = (userId: number): UseQueryResult<ClientResponse[]> => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await clientApi.getClient(userId);
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

export const useDeleteClient = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(clientApi.deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};
import { menuApi } from '@/apis';
import { defaultOption } from '@/apis/queries';
import { SaveClientMenuRequest, UpdateClientMenuRequest } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'menu';

export const useGetClientMenuList = (clientId: number) => {
  return useQuery(
    [QueryKey, 'list', clientId],
    async () => {
      const { data } = await menuApi.getClientMenuAll(clientId);
      return data;
    },
    defaultOption
  );
};

export const useAddClientMenu = (): UseMutationResult<AxiosResponse<void>, unknown, { clientId: number, data: SaveClientMenuRequest }> => {
  const queryClient = useQueryClient();

  return useMutation(({ clientId, data }) => menuApi.saveClientMenus(clientId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useUpdateClientMenuStockQuantity = (clientMenuId: number): UseMutationResult<AxiosResponse<void>, unknown, UpdateClientMenuRequest> => {
  const queryClient = useQueryClient();

  return useMutation((request) => menuApi.updateClientMenu(clientMenuId, request), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useDeleteClientMenu = (clientMenuId: number)=> {
  const queryClient = useQueryClient();

  return useMutation(() => menuApi.deleteClientMenus(clientMenuId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};
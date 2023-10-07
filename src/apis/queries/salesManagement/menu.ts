import { menuApi } from '@/apis';
import { defaultOption } from '@/apis/queries';
import { SaveClientMenuRequest } from '@/apis/swagger/data-contracts';
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

export const useDeleteClientMenu = (): UseMutationResult<AxiosResponse<void>, unknown, { clientMenuId: number }> => {
  const queryClient = useQueryClient();

  return useMutation(({ clientMenuId }) => menuApi.deleteClientMenus(clientMenuId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};
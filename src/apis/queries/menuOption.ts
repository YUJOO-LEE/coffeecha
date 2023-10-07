import { menuOptionApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { UpdateMenuOptionRequest } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'menu_option';

export const useGetOptionList = () => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await menuOptionApi.getMenuOption();
      return data;
    },
    defaultOption
  );
};

export const useAddOption = () => {
  const queryClient = useQueryClient();

  return useMutation(menuOptionApi.saveMenuOption, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useUpdateOption = (): UseMutationResult<AxiosResponse<void>, unknown, { menuOptionId: number, data: UpdateMenuOptionRequest }> => {
  const queryClient = useQueryClient();

  return useMutation(({ menuOptionId, data }) => menuOptionApi.updateMenuOption(menuOptionId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useDeleteOption = (): UseMutationResult<AxiosResponse<void>, unknown, { menuOptionId: number }> => {
  const queryClient = useQueryClient();

  return useMutation(({ menuOptionId }) => menuOptionApi.deleteMenuOption(menuOptionId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

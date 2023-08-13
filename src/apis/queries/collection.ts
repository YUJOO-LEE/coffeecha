import { categoryApi, userMenuApi } from '@/apis';
import {
  CategoryResponse,
  CreateUserMenuRequest,
  SaveResponse,
  UserMenuResponse,
} from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'collection';

const defaultOption = {
  refetchOnWindowFocus: false,
};

export const useGetCategoryList = (): UseQueryResult<CategoryResponse[]> => {
  return useQuery(
    [QueryKey, 'category'],
    async () => {
      const { data } = await categoryApi.allCategories();
      return data;
    },
    defaultOption
  );
};

export const useGetCollectionList = (): UseQueryResult<UserMenuResponse[]> => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await userMenuApi.allMenu();
      return data;
    },
    defaultOption
  );
};

export const useAddCollection = (): UseMutationResult<AxiosResponse<SaveResponse>, unknown, CreateUserMenuRequest> => {
  const queryClient = useQueryClient();

  return useMutation(userMenuApi.saveUserMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useUpdateCollection = (): UseMutationResult<AxiosResponse<void>, unknown,  { menuId: number, data: CreateUserMenuRequest }> => {
  const queryClient = useQueryClient();

  return useMutation(({ menuId, data }) => userMenuApi.updateUserMenu(menuId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useDeleteCollection = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(userMenuApi.deleteUserMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};
import { categoryApi, collectionApi, imageApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { CategoryResponse, CreateMenuRequest } from '@/apis/swagger/data-contracts';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const QueryKey = 'collection';

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

export const useGetCollectionList = () => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await collectionApi.allMenu();
      return data;
    },
    defaultOption
  );
};

export const useAddCollection = () => {
  const queryClient = useQueryClient();

  return useMutation(collectionApi.saveUserMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useUpdateCollection = (): UseMutationResult<AxiosResponse<void>, unknown, { menuId: number, data: CreateMenuRequest }> => {
  const queryClient = useQueryClient();

  return useMutation(({ menuId, data }) => collectionApi.updateUserMenu(menuId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useDeleteCollection = (): UseMutationResult<AxiosResponse<void>, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation(collectionApi.deleteUserMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'list']);
    },
  });
};

export const useImageUpload = () => useMutation(imageApi.awsS3ImageUploadUrl);

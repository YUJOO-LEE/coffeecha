import { categoryApi, userMenuApi } from '@/apis';
import { CategoryResponse, UserMenuResponse } from '@/apis/swagger/data-contracts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

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
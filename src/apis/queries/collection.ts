import { userMenuApi } from '@/apis';
import { UserMenuResponse } from '@/apis/swagger/data-contracts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const QueryKey = 'collection';

const defaultOption = {
  refetchOnWindowFocus: false,
};

export const useGetCollectionList = (userId: number): UseQueryResult<UserMenuResponse[]> => {
  return useQuery(
    [QueryKey, 'list'],
    async () => {
      const { data } = await userMenuApi.allMenu(userId);
      return data;
    },
    defaultOption
  );
};
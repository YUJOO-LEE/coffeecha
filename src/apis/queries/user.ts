import { userApi } from '@/apis';
import { defaultOption } from '@/apis/queries/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const QueryKey = 'user';

export const useGetUserDetail = () => {
  return useQuery(
    [QueryKey, 'detail'],
    async () => {
      const { data } = await userApi.getUser();
      return data;
    },
    { ...defaultOption },
  );
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation(userApi.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey, 'detail']);
    },
  });
};
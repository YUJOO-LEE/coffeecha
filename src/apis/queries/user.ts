import { userApi } from '@/apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const QueryKey = 'user';

export const useGetUserDetail = () => {
  return useQuery(
    [QueryKey, 'detail'],
    async () => {
      const { data } = await userApi.getUser();
      return data;
    },
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

export const useChangePassword = () => {
  return useMutation(userApi.updateUserPassword);
};
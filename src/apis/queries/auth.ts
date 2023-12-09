import { authApi } from '@/apis';
import { authAtom } from '@/atoms/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useLoginMutation = () => {
  const setAuthAtom = useSetAtom(authAtom);

  return useMutation(authApi.token, {
    onSuccess: (response) => {
      setAuthAtom(response.data);
    },
  });
};

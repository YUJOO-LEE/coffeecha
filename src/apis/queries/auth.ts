import { authApi } from '@/apis';
import { authAtom } from '@/atoms/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

const QueryKey = 'auth';

export const isLogin = (): boolean => {
  const authData = localStorage.getItem('auth');
  const isLogin = authData && authData !== '{}';

  return !!isLogin;
};

export const clearAuth = (): void => {
  localStorage.removeItem(QueryKey);
};

export const useLoginMutation = () => {
  const setAuthAtom = useSetAtom(authAtom);

  return useMutation(authApi.token, {
    onSuccess: (response) => {
      setAuthAtom(response.data);
    },
  });
};

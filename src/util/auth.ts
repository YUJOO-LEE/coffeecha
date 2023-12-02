import { AuthQueryKey } from '@/apis/queries/auth';
import { TokenInfo } from '@/apis/swagger/data-contracts';

export const getAuthorization = (isReturnTokenOnly?: boolean): string => {
  const authStorageData = localStorage.getItem('auth');
  if (!authStorageData) return '';

  const authData: TokenInfo = JSON.parse(authStorageData);
  const grandType = authData.grandType;
  const accessToken = authData.accessToken;

  if (isReturnTokenOnly && accessToken) return accessToken;
  return `${grandType} ${accessToken}`;
};

export const isLogin = (): boolean => {
  const authData = localStorage.getItem('auth');
  const isLogin = authData && authData !== '{}';

  return !!isLogin;
};

export const clearAuth = (): void => {
  localStorage.removeItem(AuthQueryKey);
};
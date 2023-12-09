import { AuthQueryKey } from '@/constants';
import { TokenInfo } from '@/apis/swagger/data-contracts';

export const getAuthorization = (isReturnTokenOnly?: boolean): string => {
  const authStorageData = localStorage.getItem(AuthQueryKey);
  if (!authStorageData) return '';

  const authData: TokenInfo = JSON.parse(authStorageData);
  const grandType = authData.grandType;
  const accessToken = authData.accessToken;

  if (isReturnTokenOnly && accessToken) return accessToken;
  return `${grandType} ${accessToken}`;
};

export const clearAuth = (): void => {
  localStorage.removeItem(AuthQueryKey);
  window.location.reload();
};
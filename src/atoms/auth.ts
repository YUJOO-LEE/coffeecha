import { AuthQueryKey } from '@/constants';
import { TokenInfo } from '@/apis/swagger/data-contracts';
import { atomWithStorage } from 'jotai/utils';

const localStorageTokenData = localStorage.getItem(AuthQueryKey);
export const authAtom = atomWithStorage<TokenInfo>('auth', localStorageTokenData ? JSON.parse(localStorageTokenData) : {});
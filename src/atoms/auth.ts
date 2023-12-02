import { TokenInfo } from '@/apis/swagger/data-contracts';
import { atomWithStorage } from 'jotai/utils';

export const authAtom = atomWithStorage<TokenInfo>('auth', {});
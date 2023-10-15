import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { atomWithStorage } from 'jotai/utils';

export interface CartItem {
  menuInfo: ClientMenuResponse;
  options: string[];
  quantity: number;
}

export const cartAtom = atomWithStorage<CartItem[]>('cart_list', []);
import { ClientMenuResponse, OrderRequest } from '@/apis/swagger/data-contracts';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// CART

export interface CartItem {
  clientKey: string;
  menuInfo: ClientMenuResponse;
  options: string[];
  quantity: number;
}

export interface OrderItem extends CartItem {
  remain?: number;
  error?: boolean;
}

export const cartAtom = atomWithStorage<CartItem[]>('cart_list', []);


// GUEST INFO

export const guestInfoInitialData = {
  guestName: '',
  phoneNumber: '',
  message: '',
};

export const guestInfoAtom = atom<Omit<OrderRequest, 'orderList'>>(guestInfoInitialData);


export const guestLoginInfoInitialData = {
  guestName: '',
  phoneNumber: '',
};

export const guestLoginAtom = atom<typeof guestLoginInfoInitialData>(guestLoginInfoInitialData);
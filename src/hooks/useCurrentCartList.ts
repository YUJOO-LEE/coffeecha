import { useGetClientMenuForGuest } from '@/apis/queries/guestOrder';
import { CartItem, OrderItem } from '@/pages/guestOrder/order/atoms';

export const useCurrentCartList = (cartList: CartItem[], clientKey: string): OrderItem[] => {
  const { data: menuList } = useGetClientMenuForGuest(clientKey);

  return cartList.map((item) => {
    if (!menuList) return item;
    const findMenu = menuList.find(({ clientMenuId }) => clientMenuId === item.menuInfo.clientMenuId);
    const thisMenuTotalQuantity = cartList.reduce((prev, { quantity, menuInfo }) => menuInfo.clientMenuId === item.menuInfo.clientMenuId ? prev + quantity : prev, 0);
    const availableQuantityToOrder = findMenu ? findMenu.stockQuantity - findMenu.saleQuantity : 0;

    return {
      ...item,
      remain: availableQuantityToOrder,
      error: thisMenuTotalQuantity > availableQuantityToOrder,
    };
  });
};
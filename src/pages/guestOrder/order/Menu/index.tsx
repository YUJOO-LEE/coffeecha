import { useGetClientMenuForGuest } from '@/apis/queries/guestOrder';
import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { cartAtom, CartItem } from '@/pages/guestOrder/order/@atoms';
import AddCartDialog from '@/pages/guestOrder/order/Menu/@dialogs/AddCartDialog';
import MenuListItem from '@/pages/guestOrder/order/Menu/@components/MenuListItem';
import { Box } from '@mui/material';
import { useAtom } from 'jotai/index';
import React, { useState } from 'react';

interface Props {
  clientKey: string;
  category: number | 'all';
}

const MenuList = (props: Props): React.ReactNode => {
  const { clientKey, category } = props;

  const [addCartTarget, setAddCartTarget] = useState<ClientMenuResponse | null>(null);

  const [cartList, setCartList] = useAtom(cartAtom);

  const { data } = useGetClientMenuForGuest(clientKey);
  const menuList = (category === 'all' ? data : data?.filter(({ categoryId }) => categoryId === category)) || [];

  const handleOpenAddDialog = (target: ClientMenuResponse) => () => {
    setAddCartTarget(target);
  };

  const handleClose = () => {
    setAddCartTarget(null);
  };

  const handleAdd = (newItem: CartItem) => {
    setCartList((prev) => ([
      ...prev,
      newItem,
    ]));

    handleClose();
  };

  return (
    <Box display="grid" gap="16px" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))">
      {menuList
        .sort((a, b) => a.categoryId - b.categoryId)
        .map((item) => (
          <MenuListItem key={item.clientMenuId} data={item} onAddCart={handleOpenAddDialog(item)} />
        )
      )}

      {addCartTarget && (
        <AddCartDialog
          clientKey={clientKey}
          data={addCartTarget}
          cartList={cartList}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}
    </Box>
  );
};

export default MenuList;
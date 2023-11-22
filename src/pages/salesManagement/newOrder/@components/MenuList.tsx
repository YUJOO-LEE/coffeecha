import { useGetClientMenuForGuest } from '@/apis/queries/guestOrder';
import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { CartItem } from '@/pages/guestOrder/order/@atoms';
import AddCartDialog from '@/pages/guestOrder/order/Menu/@dialogs/AddCartDialog';
import MenuListItem from '@/pages/guestOrder/order/Menu/@components/MenuListItem';
import { Card, styled } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  clientKey: string;
  cartList: CartItem[];
  onAdd: (newItem: CartItem) => void;
}

export const MenuList = (props: Props): React.ReactNode => {
  const { clientKey, cartList, onAdd } = props;

  const [addCartTarget, setAddCartTarget] = useState<ClientMenuResponse | null>(null);

  const { data: menuList } = useGetClientMenuForGuest(clientKey);

  const handleOpenAddDialog = (target: ClientMenuResponse) => () => {
    setAddCartTarget(target);
  };

  const handleClose = () => {
    setAddCartTarget(null);
  };

  const handleAdd = (newItem: CartItem) => {
    onAdd(newItem);
    handleClose();
  };

  return (
    <Styled.Wrapper>
      <Styled.List>
        {menuList?.sort((a, b) => a.categoryId - b.categoryId)
          .map((item) => (
            <MenuListItem isClientView key={item.clientMenuId} data={item} onAddCart={handleOpenAddDialog(item)} />
          )
        )}
      </Styled.List>

      {addCartTarget && (
        <AddCartDialog
          clientKey={clientKey}
          data={addCartTarget}
          cartList={cartList}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Card)({
    gridRow: 'span 2',
    padding: '24px',
    overflow: 'auto',
  }),
  List: styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
  }),
};
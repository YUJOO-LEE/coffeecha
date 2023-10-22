import { useGetClientMenuForGuest } from '@/apis/queries/guestOrder';
import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import AddCartDialog from '@/pages/guestOrder/Menu/components/AddCartDialog';
import MenuListItem from '@/pages/guestOrder/Menu/components/MenuListItem';
import { Box } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  clientKey: string;
  category: number | 'all';
}

const MenuList = (props: Props): React.ReactNode => {
  const { clientKey, category } = props;

  const [addCartTarget, setAddCartTarget] = useState<ClientMenuResponse | null>(null);

  const { data } = useGetClientMenuForGuest(clientKey);
  const menuList = (category === 'all' ? data : data?.filter(({ categoryId }) => categoryId === category)) || [];

  const handleOpenAddDialog = (target: ClientMenuResponse) => () => {
    setAddCartTarget(target);
  };

  const handleClose = () => {
    setAddCartTarget(null);
  };

  return (
    <Box display="grid" gap="16px" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))">
      {menuList.map((item) => (
        <MenuListItem key={item.clientMenuId} data={item} onAddCart={handleOpenAddDialog(item)} />
      ))}

      {addCartTarget && (
        <AddCartDialog clientKey={clientKey} data={addCartTarget} onClose={handleClose} />
      )}
    </Box>
  );
};

export default MenuList;
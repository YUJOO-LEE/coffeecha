import { useGetClientMenuForGuest } from '@/apis/queries/guestOrder';
import MenuListItem from '@/pages/guestOrder/Menu/components/MenuListItem';
import { Box } from '@mui/material';
import React from 'react';

interface IProps {
  clientKey: string
}

const MenuList = (props: IProps): React.ReactNode => {
  const { clientKey } = props;

  const { data: menuList } = useGetClientMenuForGuest(clientKey);

  return (
    <Box display="grid" gap="16px" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))">
      {menuList?.map((item, index) => (
        <MenuListItem key={index} data={item} />
      ))}
    </Box>
  );
};

export default MenuList;
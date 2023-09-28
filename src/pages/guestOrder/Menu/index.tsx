import MenuListItem from '@/pages/guestOrder/Menu/components/MenuListItem';
import { Box } from '@mui/material';
import React from 'react';

const MenuList = (): React.ReactNode => {
  return (
    <Box display="grid" gap="16px" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))">
      {[...Array(10)].map((_, index) => (
        <MenuListItem key={index} />
      ))}
    </Box>
  );
};

export default MenuList;
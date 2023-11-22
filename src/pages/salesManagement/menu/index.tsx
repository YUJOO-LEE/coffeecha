import { useGetCategoryList } from '@/apis/queries/collection';
import { useGetClientMenuList } from '@/apis/queries/salesManagement/menu';
import AddDialog from '@/pages/salesManagement/menu/@dialogs/AddDialog';
import MenuGridItem from '@/pages/salesManagement/menu/@components/MenuGridItem';
import { AddRounded, CoffeeRounded, InfoRounded } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Skeleton, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MenuPage = () => {
  const { clientId } = useParams();

  const [isAddOpen, setAddOpen] = useState<boolean>(false);

  const { data: categoryList } = useGetCategoryList();
  const { data: menuList, isLoading } = useGetClientMenuList(Number(clientId));

  const handleMenuAdd = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  return(
    <Box display="grid" gap="16px">
      <Box display="flex" gap="8px">
        <CoffeeRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          Menu
        </Typography>
      </Box>
      <Styled.ContentBox>
        <Box display="flex" gap="8px" alignItems="center">
          <Button disableElevation size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleMenuAdd}>
            Add New Menu
          </Button>
        </Box>
        {categoryList?.map(({ id, name }) => (
          <Box display="grid" gap="16px">
            <Typography fontSize="18px" fontWeight="700">
              {name}
            </Typography>
            <Styled.MenuList>
              {isLoading && (
                [...Array(5)].map((_, index) => (
                  <Styled.MenuItem key={`skeleton_${index}`}>
                    <Box>
                      <IconButton size="large" sx={{ margin: '-10px', cursor: 'auto' }}>
                        <InfoRounded sx={{ width: '16px', height: '16px' }} />
                      </IconButton>
                    </Box>
                    <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} />
                    <Skeleton variant="rounded" />
                  </Styled.MenuItem>
                ))
              )}
              {menuList?.filter(({ menuHidden, categoryId }) => id === categoryId && !menuHidden).map((item) => (
                <MenuGridItem key={item.clientMenuId} data={item} />
              ))}
              {menuList?.filter(({ menuHidden, categoryId }) => id === categoryId && menuHidden).map((item) => (
                <MenuGridItem key={item.clientMenuId} data={item} />
              ))}
            </Styled.MenuList>
          </Box>
        ))}
      </Styled.ContentBox>

      {isAddOpen && (
        <AddDialog clientId={Number(clientId)} onClose={handleClose} />
      )}
    </Box>
  );
}

export default MenuPage;

const Styled = {
  ContentBox: styled(Box)({
    display: 'grid',
    gap: '16px',
  }),
  MenuList: styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px',
  }),
  MenuItem: styled(Card)({
    padding: '16px',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gap: '16px',
  }),
};
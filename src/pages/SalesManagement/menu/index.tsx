import { useGetClientMenuList } from '@/apis/queries/salesManagement/menu';
import Layout from '@/components/Layout';
import AddDialog from '@/pages/SalesManagement/menu/components/AddDialog';
import MenuGridItem from '@/pages/SalesManagement/menu/components/MenuGridItem';
import { AddRounded, CoffeeRounded } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const MenuPage = () => {
  const { clientId } = useParams();

  const [isAddOpen, setAddOpen] = useState<boolean>(false);

  const { data: menuList } = useGetClientMenuList(Number(clientId));

  const handleMenuAdd = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  return(
    <Layout>
      <Box display="grid" gap="16px">
        <Box display="flex" gap="8px">
          <CoffeeRounded color="primary" />
          <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
            Menu
          </Typography>
        </Box>
        <Styled.ContentBox>
          <Box display="flex" gap="8px" alignItems="center">
            <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleMenuAdd}>
              Add New Menu
            </Button>
          </Box>
          <Typography>
            Coffee
          </Typography>
          <Styled.MenuList>
            {menuList?.map((item) => (
              <MenuGridItem key={item.clientMenuId} data={item} />
            ))}
          </Styled.MenuList>
        </Styled.ContentBox>
      </Box>

      {isAddOpen && (
        <AddDialog clientId={Number(clientId)} onClose={handleClose} />
      )}
    </Layout>
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
};
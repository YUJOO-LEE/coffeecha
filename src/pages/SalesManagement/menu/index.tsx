import Layout from '@/components/Layout';
import MenuGridItem from '@/pages/SalesManagement/menu/components/MenuGridItem';
import AddEditDialog from '@/pages/SalesManagement/menu/components/AddEditDialog';
import { AddRounded, CheckCircleRounded, ChecklistRounded, CoffeeRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { useState } from 'react';

const MenuPage = () => {

  const [editMode, setEditMode] = useState(false);
  const [isAddEditOpen, setAddEditOpen] = useState(false);
  const [editMenuData, setEditMenuData] = useState<any>();  // TODO

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleMenuAdd = () => {
    setAddEditOpen(true);
  };

  const handleMenuEdit = () => {
    setAddEditOpen(true);
    setEditMenuData({});
  };

  const handleClose = () => {
    setAddEditOpen(false);
    setEditMenuData(null);
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
            {editMode ? (
              <>
                <Button size="medium" variant="contained">
                  Select All
                </Button>
                <Button size="medium" variant="contained" color="error" startIcon={<CheckCircleRounded />}>
                  Save
                </Button>
                <Button size="medium" variant="outlined" onClick={toggleEditMode}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="medium" variant="contained" startIcon={<ChecklistRounded />} onClick={toggleEditMode}>
                Select Menu List
              </Button>
            )}
            <Divider orientation="vertical" sx={{ height: '80%', margin: '0 4px' }} />
            <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleMenuAdd}>
              Add New Menu
            </Button>
          </Box>
          <Typography>
            Coffee
          </Typography>
          <Styled.MenuList>
            {Array(15).fill('').map((_, index) => (
              <MenuGridItem key={index} isEditMode={editMode} onChange={handleMenuEdit} />
            ))}
          </Styled.MenuList>
          <Divider />
          <Typography>
            Dessert
          </Typography>
          <Styled.MenuList>
            {Array(5).fill('').map((_, index) => (
              <MenuGridItem key={index} isEditMode={editMode} onChange={handleMenuEdit}  />
            ))}
          </Styled.MenuList>
        </Styled.ContentBox>
      </Box>

      {isAddEditOpen && (
        <AddEditDialog editData={editMenuData} onClose={handleClose} />
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
import AddEditDialog from '@/pages/SalesManagement/menu/component/AddEditDialog';
import Layout from '@/components/Layout';
import {
  AddRounded,
  CheckCircleRounded,
  ChecklistRounded,
  CoffeeRounded,
  ModeEditOutlineRounded,
} from '@mui/icons-material';
import { Box, Button, Card, Checkbox, Divider, IconButton, Skeleton, styled, Typography } from '@mui/material';
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
              <Styled.MenuItem key={index}>
                <Box display="flex" gap="16px" justifyContent="space-between" alignItems="center">
                  <Checkbox sx={{ margin: '-10px' }} disabled={!editMode} />
                  <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleMenuEdit}>
                    <ModeEditOutlineRounded sx={{ width: '16px', height: '16px' }} />
                  </IconButton>
                </Box>
                <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} />
                <Typography>
                  Menu 1
                </Typography>
                <Typography>
                  Menu 1
                </Typography>
              </Styled.MenuItem>
            ))}
          </Styled.MenuList>
          <Divider />
          <Typography>
            Dessert
          </Typography>
          <Styled.MenuList>
            {Array(5).fill('').map((_, index) => (
              <Styled.MenuItem key={index}>
                hi
              </Styled.MenuItem>
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
  MenuItem: styled(Card)({
    padding: '16px',
    display: 'grid',
    gap: '16px',
  }),
};
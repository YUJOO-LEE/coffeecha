import { useDeleteCollection, useGetCollectionList } from '@/apis/queries/collection';
import { MenuResponse } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import Layout from '@/components/Layout';
import LoadingCircularProgress from '@/components/LoadingCircleProgress';
import AddEditDialog from '@/pages/collection/components/AddEditDialog';
import CollectionGridItem from '@/pages/collection/components/CollectionGridItem';
import OptionDialog from '@/pages/collection/components/OptionDialog';
import {
  AddRounded,
  CancelRounded,
  CoffeeMakerRounded,
  ManageSearchRounded,
  ModeEditOutlineRounded,
} from '@mui/icons-material';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

const CollectionPage = (): React.ReactNode => {

  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [editData, setEditData] = useState<MenuResponse>();

  const { data: collectionList } = useGetCollectionList();
  const deleteCollection = useDeleteCollection();

  const toggleOptionPanel = () => {
    setIsOptionOpen((prev) => !prev);
  };

  const handleAddOpen = () => {
    setIsAddEditOpen(true);
  };

  const handleEditOpen = (item: MenuResponse) => () => {
    setEditData(item);
    setIsAddEditOpen(true);
  };

  const handleEditClose = () => {
    setEditData(undefined);
    setIsAddEditOpen(false);
  };

  const handleDeleteOpen = (id: number) => () => {
    setDeleteItemId(id);
  };

  const handleDeleteClose = () => {
    setDeleteItemId(null);
  };

  const handleDelete = async () => {
    if (!deleteItemId) return;

    const { status } = await deleteCollection.mutateAsync(deleteItemId);
    if (status === 200) {
      handleDeleteClose();
    }
  };

  return (
    <Layout>
      <LoadingCircularProgress open={deleteCollection.isLoading} />

      <Box display="grid" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="20px" fontWeight="inherit" display="flex" alignItems="center" gap="8px">
            <CoffeeMakerRounded />Collection
          </Typography>
          <Box display="flex" gap="8px">
            <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleAddOpen}>
              Add New Menu
            </Button>
            <Button size="medium" color="info" variant="contained" startIcon={<ManageSearchRounded />} onClick={toggleOptionPanel}>
              Menu Options
            </Button>
          </Box>
        </Box>
        <Styled.MenuList>
          {collectionList?.map((item) => (
            <CollectionGridItem
              key={item.menuId}
              data={item}
              renderActionComponent={(
                <Box display="flex" gap="8px" justifyContent="flex-end" alignItems="center">
                  <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleDeleteOpen(item.menuId)}>
                    <CancelRounded sx={{ width: '16px', height: '16px' }} />
                  </IconButton>
                  <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleEditOpen(item)}>
                    <ModeEditOutlineRounded sx={{ width: '16px', height: '16px' }} />
                  </IconButton>
                </Box>
              )}
            />
          ))}
        </Styled.MenuList>
      </Box>

      {isOptionOpen && <OptionDialog onClose={toggleOptionPanel} />}
      {isAddEditOpen && (<AddEditDialog editData={editData} onClose={handleEditClose} />)}
      {deleteItemId && (<DeleteDialog onClose={handleDeleteClose} onDone={handleDelete} />)}
    </Layout>
  );
}

export default CollectionPage;

const Styled = {
  MenuList: styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px',
  }),
};
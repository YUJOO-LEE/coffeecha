import { useDeleteCollection, useGetCollectionList } from '@/apis/queries/collection';
import { UserMenuResponse } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import Layout from '@/components/Layout';
import AddEditDialog from '@/pages/collection/components/AddEditDialog';
import CollectionGridItem from '@/pages/collection/components/CollectionGridItem';
import { AddRounded, CoffeeMakerRounded } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

const CollectionPage = (): React.ReactNode => {

  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [editData, setEditData] = useState<UserMenuResponse>();

  const { data: collectionList } = useGetCollectionList();
  const { mutateAsync: deleteMutateAsync } = useDeleteCollection();

  const handleAddOpen = () => {
    setIsAddEditOpen(true);
  };

  const handleEditOpen = (item: UserMenuResponse) => () => {
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

    const { status } = await deleteMutateAsync(deleteItemId);
    if (status === 200) {
      handleDeleteClose();
    }
  };

  return (
    <Layout>
      <Box display="grid" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="20px" fontWeight="inherit" display="flex" alignItems="center" gap="8px">
            <CoffeeMakerRounded />Collection
          </Typography>
          <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleAddOpen}>
            Add New Menu
          </Button>
        </Box>
        <Styled.MenuList>
          {collectionList?.map((item) => (
            <CollectionGridItem data={item} onDelete={handleDeleteOpen(item.userMenuId)} onChange={handleEditOpen(item)} />
          ))}
        </Styled.MenuList>
      </Box>

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
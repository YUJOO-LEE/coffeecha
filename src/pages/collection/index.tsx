import { useGetCollectionList } from '@/apis/queries/collection';
import Layout from '@/components/Layout';
import CollectionGridItem from '@/pages/collection/components/CollectionGridItem';
import { AddRounded, CoffeeMakerRounded } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

const CollectionPage = (): React.ReactNode => {

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const { data: collectionList } = useGetCollectionList(import.meta.env.VITE_TEST_USER_ID);

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  return (
    <Layout>
      <Box display="grid" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="20px" fontWeight="inherit" display="flex" alignItems="center" gap="8px">
            <CoffeeMakerRounded />Collection
          </Typography>
          <Button size="medium" variant="contained" startIcon={<AddRounded />}>
            Add New Client
          </Button>
        </Box>
        <Styled.MenuList>
          {collectionList?.map((item) => (
            <CollectionGridItem data={item} onChange={handleEditOpen} />
          ))}
        </Styled.MenuList>
      </Box>
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
import Layout from '@/components/Layout';
import ClientAddDialog from '@/pages/SalesManagement/components/ClientAddDialog';
import ClientList from '@/pages/SalesManagement/components/ClientList';
import { AddRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesManagementPage = (): React.ReactNode => {
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleDone = (clientId: number) => {
    navigate(`/${clientId}/`);
    handleClose();
  };

  return (
    <Layout>
      <Box display="grid" gap="16px">
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="24px" fontWeight="inherit">
            Clients Management
          </Typography>
          <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleAddOpen}>
            Add New Client
          </Button>
        </Box>
        <ClientList isEditMote />
      </Box>

      {addOpen && <ClientAddDialog onClose={handleClose} onDone={handleDone} />}
    </Layout>
  );
}

export default SalesManagementPage;
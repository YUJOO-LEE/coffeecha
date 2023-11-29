import ClientAddDialog from '@/pages/salesManagement/@dialogs/ClientAddDialog';
import ClientList from '@/pages/salesManagement/@components/ClientList';
import { AddRounded, LocalShippingRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SalesManagementPage = (): React.ReactNode => {
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
    <Box display="grid" gap="16px">
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="20px" fontWeight="inherit" display="flex" alignItems="center" gap="8px">
          <LocalShippingRounded />Clients Management
        </Typography>
        <Button disableElevation size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleAddOpen}>
          Add New Client
        </Button>
      </Box>
      <ClientList isEditMote />

      {addOpen && <ClientAddDialog onClose={handleClose} onDone={handleDone} />}
    </Box>
  );
};
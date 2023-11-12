import { useDeleteClient, useGetClientDetail, useUpdateClient } from '@/apis/queries/client';
import { UpdateClientRequest } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import { ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientSettingsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState<UpdateClientRequest>({ name: '', phoneNumber: '', address: '', businessDate: '' });
  const isDisabled = Object.values(formData).some((value) => !value);

  const { data: clientDetail } = useGetClientDetail(Number(clientId));
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
    }))
  };

  const handleDateChange = (value?: dayjs.Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      businessDate: dayjs(value).format('YYYY-MM-DD') || '',
    }))
  };

  const handleUpdate = async () => {
    const { status } = await updateClient.mutateAsync({ clientId: Number(clientId), data: formData });

    if (status === 200) {
      setEditMode(false);
    }
  };

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = async () => {
    const { status} = await deleteClient.mutateAsync(Number(clientId));

    if (status === 200) {
      navigate('/');
      handleDeleteClose();
    }
  };

  useLayoutEffect(() => {
    if (!clientDetail) return;

    setFormData({
      name: clientDetail.clientName,
      address: clientDetail.address,
      phoneNumber: clientDetail.phoneNumber,
      businessDate: clientDetail.businessDate,
    })
  }, [clientDetail]);

  return (
    <Box display="grid" gap="16px">
      <LoadingCircleProgress open={updateClient.isLoading || deleteClient.isLoading} />

      <Box display="flex" gap="8px">
        <ManageAccountsRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          Settings
        </Typography>
      </Box>
      <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
        <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} disabled={!editMode} />
        <TextField label="Contact" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} disabled={!editMode} />
        <TextField label="Address" variant="outlined" value={formData.address} onChange={handleChange('address')} disabled={!editMode} />
        <DatePicker label="Opening date" value={formData.businessDate ? dayjs(formData.businessDate) : null} onChange={handleDateChange} disabled={!editMode} />
        <Box display="flex" justifyContent="flex-end" gap="8px">
          {editMode ? (
            <>
              <Button variant="outlined" size="large" onClick={toggleEditMode}>
                Cancel
              </Button>
              <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleUpdate}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button disableElevation variant="contained" color="error" size="large" onClick={handleDeleteOpen}>
                Delete
              </Button>
              <Button disableElevation variant="contained" size="large" onClick={toggleEditMode}>
                Edit
              </Button>
            </>
          )}
        </Box>
      </Styled.ContentBox>

      {isDeleteOpen && (<DeleteDialog onClose={handleDeleteClose} onDone={handleDelete} />)}
    </Box>
  );
}

export default ClientSettingsPage;

const Styled = {
  ContentBox: styled(Box)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
  })),
};
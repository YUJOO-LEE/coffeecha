import { UpdateClientRequest } from '@/apis/swagger/data-contracts';
import { ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const UserSettingsPage = (): React.ReactNode => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UpdateClientRequest>({ name: '', phoneNumber: '', address: '', businessDate: '' });
  const isDisabled = Object.values(formData).some((value) => !value);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
    }))
  };

  const handleUpdate = async () => {
    //TODO: api
  };

  // useLayoutEffect(() => {  TODO: api
  //   if (!clientDetail) return;
  //
  //   setFormData({
  //     name: clientDetail.clientName,
  //     address: clientDetail.address,
  //     phoneNumber: clientDetail.phoneNumber,
  //   })
  // }, [clientDetail]);

  return (
    <Box display="grid" gap="16px">
      <Box display="flex" gap="8px">
        <ManageAccountsRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          Settings
        </Typography>
      </Box>
      <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
        <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} disabled={!editMode} />
        <TextField label="Contact" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} disabled={!editMode} />
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
            <Button disableElevation variant="contained" size="large" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </Box>
      </Styled.ContentBox>
    </Box>
  );
};

export default UserSettingsPage;

const Styled = {
  ContentBox: styled(Box)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
  })),
};
import { useGetUserDetail, useUpdateUserInfo } from '@/apis/queries/user';
import { UpdateUserRequest } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import { getPhoneNumber } from '@/util';
import { ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useLayoutEffect, useState } from 'react';

const UserSettingsPage = (): React.ReactNode => {
  const { enqueueSnackbar } = useSnackbar();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Required<UpdateUserRequest>>({ name: '', phoneNumber: '' });

  const isDisabled = !formData.name.trim().length || formData.phoneNumber.trim().length < 12;

  const { data: userDetail, isLoading } = useGetUserDetail();
  const updateUserInfo = useUpdateUserInfo();

  const toggleEditMode = () => {
    resetFormData();
    setEditMode(!editMode);
  };

  const handleChange = (target: keyof UpdateUserRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: target === 'phoneNumber' ? getPhoneNumber(value) : value,
    }))
  };

  const handleUpdate = async () => {
    const { status } = await updateUserInfo.mutateAsync({
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    });

    if (status === 200) {
      enqueueSnackbar({ variant: 'success', message: 'Successfully saved' });
      setEditMode(false);
    } else {
      enqueueSnackbar({ variant: 'error', message: 'An error occurred, Please try again later' });
    }
  };

  const resetFormData = useCallback(() => {
    if (!userDetail) return;

    setFormData({
      name: userDetail.name,
      phoneNumber: userDetail.phoneNumber,
    })
  }, [userDetail]);

  useLayoutEffect(() => {
    resetFormData();
  }, [resetFormData]);

  return (
    <Box display="grid" gap="16px">
      <LoadingCircleProgress open={updateUserInfo.isLoading} />
      <Box display="flex" gap="8px">
        <ManageAccountsRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          Settings
        </Typography>
      </Box>
      <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
        <TextField
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange('name')}
          disabled={!editMode}
        />
        <TextField
          label="Contact"
          variant="outlined"
          value={formData.phoneNumber}
          inputProps={{ maxLength: 13, inputMode: 'numeric' }}
          onChange={handleChange('phoneNumber')}
          disabled={!editMode}
        />
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
            <Button disableElevation variant="contained" size="large" disabled={isLoading} onClick={toggleEditMode}>
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
import { useGetUserDetail, useUpdateUserInfo } from '@/apis/queries/user';
import { UpdateUserRequest } from '@/apis/swagger/data-contracts';
import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { ChangePasswordDialog } from '@/pages/settings/@dialogs/ChangePasswordDialog';
import { getPhoneNumber } from '@/util';
import { ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useLayoutEffect, useState } from 'react';

export const UserSettingsPage = (): React.ReactNode => {
  const { enqueueSnackbar } = useSnackbar();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Required<UpdateUserRequest>>({ name: '', phoneNumber: '' });

  const isDisabled = !formData.name.trim().length || formData.phoneNumber.trim().length < 12;

  const { data: userDetail, isLoading } = useGetUserDetail();
  const updateUserInfo = useUpdateUserInfo();

  const toggleEditMode = () => {
    resetFormData();
    setIsEditMode(!isEditMode);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
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
      setIsEditMode(false);
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
          계정 설정
        </Typography>
      </Box>
      <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
        <TextField
          label="상호"
          variant="outlined"
          value={formData.name}
          onChange={handleChange('name')}
          disabled={!isEditMode}
        />
        <TextField
          label="연락처"
          variant="outlined"
          value={formData.phoneNumber}
          inputProps={{ maxLength: 13, inputMode: 'numeric' }}
          onChange={handleChange('phoneNumber')}
          disabled={!isEditMode}
        />
        {isEditMode ? (
          <Box display="flex" justifyContent="flex-end" gap="8px">
            <Button variant="outlined" size="large" onClick={toggleEditMode}>
              취소
            </Button>
            <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleUpdate}>
              저장
            </Button>
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" gap="8px">
            <Button disableElevation variant="contained" size="large" disabled={isLoading} onClick={handleDialogOpen}>
              비밀번호 변경
            </Button>
            <Button disableElevation variant="contained" size="large" disabled={isLoading} onClick={toggleEditMode}>
              정보 변경
            </Button>
          </Box>
        )}
      </Styled.ContentBox>

      {isDialogOpen && <ChangePasswordDialog onClose={handleDialogClose} />}
    </Box>
  );
};

const Styled = {
  ContentBox: styled(Box)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
  })),
};
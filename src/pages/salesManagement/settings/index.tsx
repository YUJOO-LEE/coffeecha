import { useDeleteClient, useGetClientDetail, useUpdateClient } from '@/apis/queries/client';
import { UpdateClientRequest } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const getValidValue: Partial<Record<keyof UpdateClientRequest, (value: string) => string | number>> = {
  totalQuantity: (value) => Number(value),
};

export const ClientSettingsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [editMode, setEditMode] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState<UpdateClientRequest>({ name: '', phoneNumber: '', address: '', businessDate: '', totalQuantity: 0 });
  const isDisabled = Object.entries(formData).some(([key, value]) => key !== 'totalQuantity' && !value);

  const { data: clientDetail, isLoading } = useGetClientDetail(Number(clientId));
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const toggleEditMode = () => {
    resetFormData();
    setEditMode(!editMode);
  };

  const handleChange = (target: keyof UpdateClientRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValidValue[target]?.(e.target.value) || e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: value,
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
      enqueueSnackbar({ variant: 'success', message: 'Successfully saved' });
      setEditMode(false);
    } else {
      enqueueSnackbar({ variant: 'error', message: 'An error occurred, Please try again later' });
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

  const resetFormData = useCallback(() => {
    if (!clientDetail) return;

    setFormData({
      name: clientDetail.clientName,
      address: clientDetail.address,
      phoneNumber: clientDetail.phoneNumber,
      businessDate: clientDetail.businessDate,
      totalQuantity: clientDetail.totalQuantity,
    });
  }, [clientDetail]);

  useLayoutEffect(() => {
    resetFormData();
  }, [resetFormData]);

  return (
    <Box display="grid" gap="16px">
      <LoadingCircleProgress open={updateClient.isLoading || deleteClient.isLoading} />

      <Box display="flex" gap="8px">
        <ManageAccountsRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          고객사 정보
        </Typography>
      </Box>
      <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
        <TextField label="고객명" variant="outlined" value={formData.name} onChange={handleChange('name')} disabled={!editMode} />
        <TextField label="연락처" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} disabled={!editMode} />
        <TextField label="출장 주소" variant="outlined" value={formData.address} onChange={handleChange('address')} disabled={!editMode} />
        <DatePicker label="영업 예정일" value={formData.businessDate ? dayjs(formData.businessDate) : null} onChange={handleDateChange} disabled={!editMode} />
        <TextField label="계약 수량" variant="outlined" type="number" value={formData.totalQuantity?.toString() || '0'} onChange={handleChange('totalQuantity')} disabled={!editMode} />
        <Box display="flex" justifyContent="flex-end" gap="8px">
          {editMode ? (
            <>
              <Button variant="outlined" size="large" onClick={toggleEditMode}>
                취소
              </Button>
              <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleUpdate}>
                저장
              </Button>
            </>
          ) : (
            <>
              <Button disableElevation variant="contained" color="error" size="large" onClick={handleDeleteOpen}>
                삭제
              </Button>
              <Button disableElevation variant="contained" size="large" disabled={isLoading} onClick={toggleEditMode}>
                수정
              </Button>
            </>
          )}
        </Box>
      </Styled.ContentBox>

      {isDeleteOpen && (<DeleteDialog onClose={handleDeleteClose} onDone={handleDelete} />)}
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
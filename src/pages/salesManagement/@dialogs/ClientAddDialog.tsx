import { useAddClient } from '@/apis/queries/client';
import { SaveClientRequest, UpdateClientRequest } from '@/apis/swagger/data-contracts';
import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const getValidValue: Partial<Record<keyof UpdateClientRequest, (value: string) => string | number>> = {
  totalQuantity: (value) => Number(value),
};

type Props = {
  onClose: () => void;
  onDone: (clientId: number) => void;
};

const ClientAddDialog = (props: Props): React.ReactNode => {
  const { onClose, onDone } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<SaveClientRequest, 'userId'>>({ name: '', address: '', businessDate: '', phoneNumber: '' });

  const addClient = useAddClient();

  const handleChange = (target: keyof SaveClientRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValidValue[target]?.(e.target.value) || e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const handleDateChange = (value?: dayjs.Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      businessDate: dayjs(value).format('YYYY-MM-DD') || '',
    }))
  };

  const handleSave = async () => {
    setIsDisabled(true);
    const { data } = await addClient.mutateAsync({
      ...formData,
    });

    if (data.id) {
      onDone(data.id);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setIsDisabled(Object.values(formData).some((value) => !value))
  }, [formData]);

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <LoadingCircleProgress open={addClient.isLoading} />

      <DialogTitle display="flex" justifyContent="space-between">
        신규 고객 추가
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="4px">
          <TextField label="고객명" variant="outlined" value={formData.name} onChange={handleChange('name')} />
          <TextField label="연락처" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
          <TextField label="출장 주소" variant="outlined" value={formData.address} onChange={handleChange('address')} />
          <DatePicker label="영업 예정일" value={formData.businessDate ? dayjs(formData.businessDate) : null} onChange={handleDateChange} />
          <TextField label="계약 수량" variant="outlined" type="number" value={formData.totalQuantity?.toString() || '0'} onChange={handleChange('totalQuantity')} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          취소
        </Button>
        <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleSave}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientAddDialog;
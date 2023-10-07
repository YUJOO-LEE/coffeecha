import { useAddClient } from '@/apis/queries/client';
import { SaveClientRequest } from '@/apis/swagger/data-contracts';
import LoadingCircularProgress from '@/components/LoadingCircleProgress';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface IProps {
  onClose: () => void;
  onDone: (clientId: number) => void;
}

const ClientAddDialog = (props: IProps): React.ReactNode => {
  const { onClose, onDone } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<SaveClientRequest, 'userId'>>({ name: '', address: '', businessDate: '', phoneNumber: '' });

  const addClient = useAddClient();

  const handleChange = (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
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
      <LoadingCircularProgress open={addClient.isLoading} />

      <DialogTitle display="flex" justifyContent="space-between">
        Add New Customer
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="4px">
          <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} />
          <TextField label="Contact" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
          <TextField label="Address" variant="outlined" value={formData.address} onChange={handleChange('address')} />
          <DatePicker label="Business date" value={formData.businessDate ? dayjs(formData.businessDate) : null} onChange={handleDateChange} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleSave}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientAddDialog;
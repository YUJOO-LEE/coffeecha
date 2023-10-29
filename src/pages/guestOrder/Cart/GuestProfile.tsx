import { OrderRequest } from '@/apis/swagger/data-contracts';
import { guestInfoAtom } from '@/pages/guestOrder/atoms';
import { getPhoneNumber } from '@/util';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

interface IProps {
  onClose: () => void;
}

const GuestProfile = (props: IProps): React.ReactNode => {
  const { onClose } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useAtom(guestInfoAtom);

  const handleChange = (target: keyof Omit<OrderRequest, 'orderList'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: target === 'phoneNumber' ? getPhoneNumber(value) : value,
    }));
  };

  const handleSave = async () => {

  };

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '30%', minWidth: '320px' } }}>
      <DialogTitle>
        주문자 정보
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="8px">
          <TextField label="주문자/팀명" variant="outlined" value={formData.guestName} onChange={handleChange('guestName')} />
          <TextField label="안내문자 수신 연락처" inputProps={{ maxLength: 13, inputMode: 'numeric' }} variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
          <TextField label="커피차에 남길 메세지" variant="outlined" value={formData.message} onChange={handleChange('message')} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="large" onClick={onClose}>
          주문취소
        </Button>
        <Button disableElevation variant="contained" size="large" disabled={isDisabled} onClick={handleSave}>
          주문하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestProfile;
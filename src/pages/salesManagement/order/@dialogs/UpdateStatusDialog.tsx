import { OrderStatus } from '@/apis/swagger/data-contracts.ts';
import { orderStatusList } from '@/constants/orderStatusList.ts';
import { orderActions } from '@/pages/salesManagement/order/@constants.ts';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

type Props = {
  from: OrderStatus;
  to: OrderStatus;
  onClose: () => void;
  onDone: () => void;
}

export const UpdateStatusDialog = (props: Props) => {
  const { onClose, onDone, to, from } = props;

  const Icon = orderActions[from].icon;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { minWidth: '400px' } }}>
      <DialogContent>
        <Typography>
          주문 상태를 변경 하시겠습니까?
        </Typography>
        <Typography>
          변경된 상태는 되돌릴 수 없습니다.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="outlined" size="large" onClick={onClose}>
          취소
        </Button>
        <Button variant="contained" size="large" color={orderActions[from].color} disableElevation onClick={onDone} startIcon={<Icon />}>
          {orderStatusList[to].ko}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
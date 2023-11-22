import { OrderStatus } from '@/apis/swagger/data-contracts';
import { orderActions } from '@/pages/salesManagement/order/@constants';
import { CancelDialog } from '@/pages/salesManagement/order/@dialogs/CancelDialog';
import { CloseRounded } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  orderId: number;
  status: OrderStatus;
};

export const OrderActions = (props: Props): React.ReactNode => {
  const { orderId, status } = props;

  const Icon = orderActions[status]?.icon;
  const isCancelShow = status !== OrderStatus.ORDER_CANCELLED && status !== OrderStatus.PICKUP_COMPLETE;

  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);

  const handleCancelOpen = () => {
    setIsCancelOpen(true);
  };

  const handleClose = () => {
    setIsCancelOpen(false);
  };

  const handleStatusChange = async () => {
    // TODO: api
  };

  return (
    <Styled.Actions display="flex" gap="8px" alignItems="flex-start">
      {orderActions[status] && (  // status 에 따른 action button 출력
        <Styled.ActionButton
          disableElevation
          size="small"
          variant={orderActions[status].variant}
          color={orderActions[status].color}
        >
          <Icon/>
        </Styled.ActionButton>
      )}

      {isCancelShow && (
        <Styled.ActionButton size="small" variant="outlined" color="error" onClick={handleCancelOpen}>
          <CloseRounded />
        </Styled.ActionButton>
      )}

      {isCancelOpen && (
        <CancelDialog onDone={handleStatusChange} onClose={handleClose} />
      )}
    </Styled.Actions>
  );
};

const Styled = {
  Actions: styled(Box)({
    gridColumn: '4',
    gridRow: '1 / 4',
  }),
  ActionButton: styled(Button)({
    height: '64px',
  }),
};
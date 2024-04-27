import { useUpdateStatus } from '@/apis/queries/salesManagement/order';
import { OrderStatus } from '@/apis/swagger/data-contracts';
import { orderActions } from '@/pages/salesManagement/order/@constants';
import { CancelDialog } from '@/pages/salesManagement/order/@dialogs/CancelDialog';
import { UpdateStatusDialog } from '@/pages/salesManagement/order/@dialogs/UpdateStatusDialog.tsx';
import { CloseRounded } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

type Props = {
  orderId: number;
  status: OrderStatus;
};

export const OrderActions = (props: Props): React.ReactNode => {
  const { orderId, status } = props;
  const { enqueueSnackbar } = useSnackbar();

  const Icon = orderActions[status]?.icon;
  const isCancelShow = status !== OrderStatus.ORDER_CANCELLED && status !== OrderStatus.PICKUP_COMPLETE;

  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);

  const updateStatus = useUpdateStatus();

  const handleUpdateOpen = () => {
    setIsUpdateOpen(true);
  };

  const handleCancelOpen = () => {
    setIsCancelOpen(true);
  };

  const handleClose = () => {
    setIsUpdateOpen(false);
    setIsCancelOpen(false);
  };

  const handleStatusChange = (target: OrderStatus) => async () => {
    try {
      await updateStatus.mutateAsync({ orderId, orderStatus: target });
      enqueueSnackbar('Status has been successfully changed', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('An error occurred, Please try again later', { variant: 'error' });
    }
    handleClose();
  };

  return (
    <Styled.Actions display="flex" gap="8px" alignItems="flex-start">
      {orderActions[status] && (  // status 에 따른 action button 출력
        <Styled.ActionButton
          disableElevation
          size="small"
          variant={orderActions[status].variant}
          color={orderActions[status].color}
          onClick={handleUpdateOpen}
          disabled={updateStatus.isLoading}
        >
          <Icon/>
        </Styled.ActionButton>
      )}

      {isCancelShow && (
        <Styled.ActionButton
          size="small"
          variant="outlined"
          color="error"
          onClick={handleCancelOpen}
          disabled={updateStatus.isLoading}
        >
          <CloseRounded/>
        </Styled.ActionButton>
      )}

      {isUpdateOpen && (
        <UpdateStatusDialog
          from={status}
          to={orderActions[status].actionTarget}
          onDone={handleStatusChange(orderActions[status].actionTarget)}
          onClose={handleClose}
        />
      )}
      {isCancelOpen && (
        <CancelDialog onDone={handleStatusChange(OrderStatus.ORDER_CANCELLED)} onClose={handleClose}/>
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
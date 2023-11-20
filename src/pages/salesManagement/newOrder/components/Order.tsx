import { useOrder } from '@/apis/queries/guestOrder';
import { OrderMenuRequest, OrderRequest } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import { CartItem } from '@/pages/guestOrder/order/atoms';
import { getPhoneNumber } from '@/util';
import { Box, Button, Card, styled, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

const initialFormData = { guestName: '', phoneNumber: '' };

type Props = {
  clientKey: string;
  cartList: CartItem[];
  onReset: () => void;
};

export const Order = (props: Props): React.ReactNode => {
  const { clientKey, cartList, onReset } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<Omit<OrderRequest, 'orderList'>>(initialFormData);

  const isDisable = !formData.guestName.trim() || !formData.phoneNumber || formData.phoneNumber.trim().length < 12 || !cartList.length;

  const guestOrder = useOrder(clientKey);

  const handleChange = (target: keyof Omit<OrderRequest, 'orderList'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: target === 'phoneNumber' ? getPhoneNumber(value) : value,
    }));
  };

  const getOrderList = (): OrderMenuRequest[] => (
    cartList.map(({ menuInfo, quantity, options}) => ({
      clientMenuId: menuInfo.clientMenuId,
      option: options.join(','),
      quantity,
    }))
  );

  const getRequest = () => ({
    guestName: formData.guestName,
    phoneNumber: formData.phoneNumber,
    message: formData.message,
    orderList: getOrderList(),
  });

  const handleOrder = async () => {
    if (isDisable) return;

    const request = getRequest();
    try {
      await guestOrder.mutateAsync(request);
      setFormData(initialFormData);
      onReset();
    } catch (e: unknown) {
      enqueueSnackbar('The order has failed', { variant: 'error' });
    }
  };

  return (
    <Styled.Wrapper>
      <LoadingCircleProgress open={guestOrder.isLoading} />
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField label="주문자/팀명" variant="outlined" value={formData.guestName} onChange={handleChange('guestName')} />
        <TextField label="안내문자 수신 연락처" inputProps={{ maxLength: 13, inputMode: 'numeric' }} variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap="8px" flex="1">
        <Button variant="text" onClick={onReset}>
          Reset
        </Button>
        <Button variant="contained" disableElevation disabled={isDisable || guestOrder.isLoading} onClick={handleOrder}>
          Order
        </Button>
      </Box>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Card)({
    padding: '16px',
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gap: '24px',
  }),
};
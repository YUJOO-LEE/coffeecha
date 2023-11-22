import { useOrder } from '@/apis/queries/guestOrder';
import { OrderMenuRequest, OrderRequest } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import { cartAtom, guestInfoAtom, OrderItem } from '@/pages/guestOrder/order/@atoms';
import { getPhoneNumber } from '@/util';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  clientKey: string;
  orderList: OrderItem[];
  onClose: () => void;
}

const GuestProfile = (props: IProps): React.ReactNode => {
  const { clientKey, orderList, onClose } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const setCartList = useSetAtom(cartAtom);
  const [formData, setFormData] = useAtom(guestInfoAtom);

  const isFormEmpty = !formData.guestName || !formData.phoneNumber || formData.phoneNumber.length < 12;

  const guestOrder = useOrder(clientKey);

  const handleChange = (target: keyof Omit<OrderRequest, 'orderList'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [target]: target === 'phoneNumber' ? getPhoneNumber(value) : value,
    }));
  };

  const getOrderList = (): OrderMenuRequest[] => (
    orderList.map(({ menuInfo, quantity, options}) => ({
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
    setIsDisabled(true);

    const request = getRequest();
    try {
      const { data } = await guestOrder.mutateAsync(request);
      setCartList([]);
      setFormData((prev) => ({ ...prev, message: '' }));
      navigate(`/order/detail/${data.orderKey}`);
    } catch (e: unknown) {
      enqueueSnackbar(`주문에 실패했습니다`, { variant: 'error' });
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '30%', minWidth: '320px' } }} disableScrollLock>
      <LoadingCircleProgress open={guestOrder.isLoading} />
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
        <Button disableElevation variant="contained" size="large" disabled={isFormEmpty || isDisabled} onClick={handleOrder}>
          주문하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestProfile;
import { useGetGuestOrderDetail } from '@/apis/queries/guestOrder';
import { orderStatusList } from '@/constants/orderStatusList';
import GuestLayout from '@/pages/guestOrder/@components/Layout';
import { GuestProfile } from '@/pages/guestOrder/detail/GuestProfile';
import { MenuList } from '@/pages/guestOrder/detail/MenuList';
import NoCoffeechaDataPage from '@/pages/guestOrder/order/Error/NoCoffeechaDataPage';
import { Box, Button, Card, Divider, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GuestOrderDetailPage = (): React.ReactNode => {
  const { orderKey } = useParams();
  const navigate = useNavigate();

  const { data: orderDetail, isError, isLoading } = useGetGuestOrderDetail(orderKey);
  const isWrongClientData = !orderKey || isError;

  if (isWrongClientData) return <NoCoffeechaDataPage />;

  const handleList = () => {
    navigate('/order/list');
  };

  const handleOrder = () => {
    if (!orderDetail) return;
    navigate(`/order/${orderDetail.clientKey}`);
  };

  return (
    <GuestLayout
      title="주문 상세"
      goBackAction={handleList}
      actionComponent={(
        <Button size="small" variant="contained" onClick={handleOrder} disableElevation>
          추가주문
        </Button>
      )}
    >
      <Box display="grid" gap="16px">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>
            현재 주문 상태
          </Typography>
          <Typography variant="h4" color={(theme) => theme.palette.primary.main}>
            {isLoading || !orderDetail ? (
              <Skeleton width="100px" />
            ) : (
              orderStatusList[orderDetail.status].ko
            )}
          </Typography>
        </Box>
        <Card>
          <GuestProfile isLoading={isLoading} orderKey={orderKey} data={orderDetail} />
          <Divider />
          <MenuList isLoading={isLoading} data={orderDetail?.orderList} totalQuantity={orderDetail?.totalQuantity} />
        </Card>
      </Box>
    </GuestLayout>
  );
};

export default GuestOrderDetailPage;
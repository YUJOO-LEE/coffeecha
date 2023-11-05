import { useGetGuestOrderDetail } from '@/apis/queries/guestOrder';
import { orderStatusList } from '@/assets/orderStatusList';
import GuestLayout from '@/pages/guestOrder/components/Layout';
import { GuestProfile } from '@/pages/guestOrder/detail/GuestProfile';
import { MenuList } from '@/pages/guestOrder/detail/MenuList';
import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GuestOrderDetailPage = (): React.ReactNode => {
  const { orderKey } = useParams();
  const navigate = useNavigate();

  const { data } = useGetGuestOrderDetail(orderKey);

  if (!orderKey || !data) return <></>;

  const handleList = () => {
    navigate('/order/list');
  };

  return (
    <GuestLayout title="주문 상세" goBackAction={handleList}>
      <Box display="grid" gap="16px">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>
            현재 주문 상태
          </Typography>
          <Typography variant="h4" color={(theme) => theme.palette.primary.main}>
            {orderStatusList[data.status].name}
          </Typography>
        </Box>
        <Card>
          <GuestProfile orderKey={orderKey} data={data} />
          <Divider />
          <MenuList data={data.orderList} />
        </Card>
      </Box>
    </GuestLayout>
  );
};

export default GuestOrderDetailPage;
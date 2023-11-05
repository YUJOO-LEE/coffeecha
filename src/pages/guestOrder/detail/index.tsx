import GuestLayout from '@/pages/guestOrder/components/Layout';
import { GuestProfile } from '@/pages/guestOrder/detail/GuestProfile';
import { MenuList } from '@/pages/guestOrder/detail/MenuList';
import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const GuestOrderDetailPage = (): React.ReactNode => {
  const { orderKey } = useParams();

  if (!orderKey) return <></>

  return (
    <GuestLayout title="주문 상세">
      <Box display="grid" gap="16px">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>
            현재 주문 상태
          </Typography>
          <Typography variant="h4" color={(theme) => theme.palette.primary.main}>
            주문 접수
          </Typography>
        </Box>
        <Card>
          <GuestProfile orderKey={orderKey} />
          <Divider />
          <MenuList />
        </Card>
      </Box>
    </GuestLayout>
  );
};

export default GuestOrderDetailPage;
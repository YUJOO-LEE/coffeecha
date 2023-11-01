import GuestOrderHeader from '@/pages/guestOrder/components/Header';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const GuestOrderDetailPage = (): React.ReactNode => {
  const { orderKey } = useParams();

  return (
    <Box>
      <GuestOrderHeader
        title="주문 상세"
        goBackAction={() => {}}
      />
      <Box>
        hi
      </Box>
    </Box>
  );
};

export default GuestOrderDetailPage;
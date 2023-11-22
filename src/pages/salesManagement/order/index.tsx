import { useGetOrderList } from '@/apis/queries/client';
import { ClientOrderResult } from '@/apis/swagger/data-contracts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { OrderListItem } from '@/pages/salesManagement/order/components/OrderListItem';
import { OrderListItemSkeleton } from '@/pages/salesManagement/order/components/OrderListItemSkeleton';
import { ReceiptLongRounded } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const limit = 10;

const OrderPage = (): React.ReactNode => {
  const { clientId } = useParams();

  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(fetchMoreRef);

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } = useGetOrderList(Number(clientId), limit);
  const orderList = data?.pages.reduce<ClientOrderResult[]>((prev, { orders }) => ([...prev, ...orders]), []) || [];

  useEffect(() => {
    if (!isIntersecting || isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage, isIntersecting, hasNextPage]);

  return (
    <Box display="grid" gap="16px">
      <Box display="flex" gap="8px">
        <ReceiptLongRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          ORDER
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="16px">
        {isLoading && [...Array(10)].map((_, index) => (
          <OrderListItemSkeleton key={`skeleton_${index}`} />
        ))}
        {orderList.map((item) => (
          <OrderListItem key={item.orderId} data={item} />
        ))}
        {isFetchingNextPage && (
          <OrderListItemSkeleton />
        )}
      </Box>

      <Styled.FetchMore ref={fetchMoreRef} />
    </Box>
  );
}

export default OrderPage;

const Styled = {
  FetchMore: styled('div')({
    width: '100%',
    height: '8px',
  }),
};
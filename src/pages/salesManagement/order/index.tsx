import { useGetOrderList } from '@/apis/queries/salesManagement/order';
import { ClientOrderResult, OrderStatus } from '@/apis/swagger/data-contracts';
import { orderStatusList } from '@/constants/orderStatusList';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { OrderListItem } from '@/pages/salesManagement/order/@components/OrderListItem';
import { OrderListItemSkeleton } from '@/pages/salesManagement/order/@components/OrderListItemSkeleton';
import { ReceiptLongRounded } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const limit = 10;

export const OrderPage = (): React.ReactNode => {
  const { clientId } = useParams();

  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(fetchMoreRef);

  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링을 searchParams 형태로 가져오고
  const filter = searchParams.get('filter');

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } = useGetOrderList(Number(clientId), limit);
  const orderList = data?.pages.reduce<ClientOrderResult[]>((prev, { orders }) => ([...prev, ...orders]), []) || [];

  const handleFilter = (filter: string) => () => {
    if (searchParams.get('filter') === filter) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!isIntersecting || isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage, isIntersecting, hasNextPage]);

  return (
    <Box display="grid" gap="16px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap="8px">
          <ReceiptLongRounded color="primary" />
          <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
            주문 관리
          </Typography>
        </Box>
        <Box display="flex" gap="4px">
          {Object.entries(orderStatusList).map(([key, value]) => (
            <Button
              key={key}
              variant="text"
              size="small"
              color="inherit"
              onClick={handleFilter(key)}
            >
              <Box padding="0 4px" display="flex" alignItems="center" gap="6px">
                {(!filter || filter === key) && (<Styled.StatusColorChip status={key as OrderStatus} />)}
                <Typography color={(filter && filter !== key) ? 'grey' : undefined}>
                  {value.ko}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
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
};

const Styled = {
  FetchMore: styled('div')({
    width: '100%',
    height: '8px',
  }),
  StatusColorChip: styled('i')<{ status: OrderStatus }>(({ status, theme }) => ({
    width: '16px',
    height: '6px',
    borderRadius: '4px',
    backgroundColor: orderStatusList[status].colorForAdmin(theme),
  })),
};
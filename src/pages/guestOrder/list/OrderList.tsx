import { GuestOrderResponse } from '@/apis/swagger/data-contracts';
import { OrderListItem } from '@/pages/guestOrder/list/OrderListItem';
import { guestLoginAtom } from '@/pages/guestOrder/order/atoms';
import { Box, Card, Divider, Skeleton, styled, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import React from 'react';

interface Props {
  data?: GuestOrderResponse[];
  isLoading: boolean;
}

export const OrderList = (props: Props): React.ReactNode => {
  const { data } = props;
  const guestLoginInfo = useAtomValue(guestLoginAtom);
  const isLoading = !data || props.isLoading;

  return (
    <Styled.Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography>
          <strong>{isLoading ? (<Skeleton />) : guestLoginInfo.guestName}</strong>
          ({!isLoading && guestLoginInfo.phoneNumber}) 님의 주문 내역
        </Typography>
        <Typography>
          총 <strong>{isLoading ? (<Skeleton />) : data.length}</strong> 건
        </Typography>
      </Box>
      {isLoading ? (
        [...Array(5)].map((_, index) => (
          <Styled.SkeletonWrapper key={`order-skeleton-${index}`}>
            <Skeleton />
            <Divider sx={{ margin: '0 -16px' }} />
            <Skeleton />
          </Styled.SkeletonWrapper>
        ))
      ) : data.map((item) => (
        <OrderListItem key={item.orderKey} data={item} />
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')({
    display: 'grid',
    gap: '16px',
  }),
  SkeletonWrapper: styled(Card)({
    display: 'grid',
    gap: '12px',
    padding: '16px',
  }),
};
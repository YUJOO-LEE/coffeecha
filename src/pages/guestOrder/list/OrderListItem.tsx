import { GuestOrderResponse, OrderStatus } from '@/apis/swagger/data-contracts';
import { orderStatusList } from '@/constants/orderStatusList';
import { Box, Card, Chip, Divider, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: GuestOrderResponse;
}

export const OrderListItem = (props: Props): React.ReactNode => {
  const { data } = props;
  const navigate = useNavigate();

  const restQuantity = data.totalQuantity - 1;

  const handleMove = () => {
    navigate(`/order/detail/${data.orderKey}`);
  };

  return (
    <Styled.Wrapper onClick={handleMove}>
      <Box display="flex" gap="8px" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <Box display="flex" gap="8px" alignItems="center">
          <Styled.OrderStatus label={orderStatusList[data.orderStatus].ko} status={data.orderStatus} />
          <Typography fontWeight={700}>
            {data.userName}
          </Typography>
          <Typography>
            {data.clientName}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: '0 -16px' }} />
      <Box display="flex" gap="8px" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <Typography>
          {data.firstMenuName} {restQuantity > 0 && `외 수량 ${restQuantity}`}
        </Typography>
        <Typography fontSize="0.8rem" color={(theme) => theme.palette.grey[600]}>
          {dayjs(data.orderDateTime).format('YYYY년 MM월 DD일, HH시 mm분 ss초')}
        </Typography>
      </Box>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Card)(({ theme }) => ({
    display: 'grid',
    gap: '12px',
    padding: '16px',
    cursor: 'pointer',
    '&:hover': {
      outline: `3px solid ${theme.palette.primary.main}`
    },
  })),
  OrderStatus: styled(Chip)<{ status: OrderStatus }>(({ status, theme }) => ({
    backgroundColor: orderStatusList[status].colorForGuest(theme),
    color: theme.palette.common.white,
    fontWeight: '500',
  })),
};
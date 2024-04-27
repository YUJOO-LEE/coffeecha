import { OrderMenuInfo, OrderStatus } from '@/apis/swagger/data-contracts.ts';
import { orderStatusList } from '@/constants/orderStatusList.ts';
import { Box, Chip, styled, Typography } from '@mui/material';
import React from 'react';

type Props = {
  orderStatus: OrderStatus;
  data: OrderMenuInfo;
};

export const OrderMenuItem = (props: Props) => {
  const { orderStatus, data } = props;

  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Styled.QuantityChip
        size="small"
        variant="filled"
        label={data.orderQuantity}
        status={data.orderQuantity > 1 ? orderStatus : undefined}
      />
      <Typography>
        {data.menuName}
      </Typography>
      <Typography color="grey">
        {data.menuOption}
      </Typography>
    </Box>
  );
};

const Styled = {
  QuantityChip: styled(Chip)<{ status?: OrderStatus }>({
    borderRadius: '4px',
  }, ({ status, theme }) => ({
    backgroundColor: status ? orderStatusList[status].colorForAdmin(theme) : undefined,
    color: status ? theme.palette.common.white : undefined,
  })),
};
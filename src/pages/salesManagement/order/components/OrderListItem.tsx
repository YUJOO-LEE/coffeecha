import { ClientOrderResult, OrderStatus } from '@/apis/swagger/data-contracts';
import { orderStatusList } from '@/constants/orderStatusList';
import { OrderActions } from '@/pages/salesManagement/order/components/OrderActions';
import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Divider,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import numeral from 'numeral';
import React from 'react';

type Props = {
  data: ClientOrderResult;
};

export const OrderListItem = (props: Props): React.ReactNode => {
  const { data } = props;
  const theme = useTheme();

  const isDefaultExpanded = data.orderStatus === OrderStatus.ORDER_PLACED || data.orderStatus === OrderStatus.ORDER_ACCEPTED;

  return (
    <Styled.ListItem>
      <Styled.Status color={orderStatusList[data.orderStatus].color(theme)} />
      <Styled.NumberTypography fontSize="28px" fontWeight="500">
        {numeral(data.orderNumber).format('000')}
      </Styled.NumberTypography>
      <Box display="flex" alignItems="flex-end" gap="16px">
        <Typography fontSize="12px">
          {data.guestName}
        </Typography>
        <Typography fontSize="12px" color="grey">
          {data.phoneNumber}
        </Typography>
        <Typography fontSize="14px" color={(theme) => theme.palette.error.main} flex={1}>
          {data.message}
        </Typography>
        <Typography fontSize="12px" color="grey">
          {dayjs(data.orderDateTime).format('h:mma')}
        </Typography>
      </Box>
      <Divider />
      <Styled.OrderDetail defaultExpanded={isDefaultExpanded} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreRounded />} >
          <Typography>
            합계 수량 {data.totalQuantity}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.orderMenus.map((menu, index) => (
            <Box key={`${data.orderId}_menu_${index}`} display="flex" alignItems="center" gap="8px">
              <Styled.QuantityChip
                size="small"
                variant="filled"
                label={menu.orderQuantity}
                status={menu.orderQuantity > 1 ? data.orderStatus : undefined}
              />
              <Typography>
                {menu.menuName}
              </Typography>
              <Typography color="grey">
                {menu.menuOption}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Styled.OrderDetail>
      <OrderActions orderId={data.orderId} status={data.orderStatus} />
    </Styled.ListItem>
  );
};

const Styled = {
  ListItem: styled(Card)(({ theme }) => ({
    padding: '16px 16px 16px 0',
    display: 'grid',
    gridTemplateColumns: '10px 80px 1fr auto',
    gridTemplateRows: '20px 3px auto',
    gap: '8px',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  })),
  Status: styled(Box)<{ color: string }>({
    gridColumn: '1',
    gridRow: '1 / 4',
    borderRadius: '0 4px 4px 0',
  }, ({ color }) => ({
    backgroundColor: color,
  })),
  NumberTypography: styled(Typography)({
    gridColumn: '2',
    gridRow: '1 / 4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  OrderDetail: styled(Accordion)({
    border: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      padding: 0,
      minHeight: 'unset',
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
    '& .MuiAccordionDetails-root': {
      padding: '16px 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  }),
  QuantityChip: styled(Chip)<{ status?: OrderStatus }>({
    borderRadius: '4px',
  }, ({ status, theme }) => ({
    backgroundColor: status ? orderStatusList[status].color(theme) : undefined,
    color: status ? theme.palette.common.white : undefined,
  })),
};
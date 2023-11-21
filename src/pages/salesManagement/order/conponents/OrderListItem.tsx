import { ClientOrderResult } from '@/apis/swagger/data-contracts';
import { OrderStatusEnum } from '@/type/order';
import { CheckRounded, CloseRounded, CoffeeRounded, ExpandMoreRounded, HowToRegRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  styled,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import numeral from 'numeral';
import React from 'react';

type Props = {
  data: ClientOrderResult;
};

export const OrderListItem = (props: Props): React.ReactNode => {
  const { data } = props;

  return (
    <Styled.ListItem>
      <Styled.Status className={OrderStatusEnum.OrderPlaced} />
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
      <Styled.OrderDetail disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreRounded />} >
          <Typography>
            합계 수량 {data.totalQuantity}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.orderMenus.map((menu, index) => (
            <Box key={`${data.orderId}_menu_${index}`} display="flex" gap="8px">
              <Typography>
                {menu.menuName}
              </Typography>
              <Typography color="grey">
                {menu.menuOption}
              </Typography>
              <Typography color={(theme) => menu.orderQuantity > 1 ? theme.palette.error.main : undefined}>
                수량 {menu.orderQuantity}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Styled.OrderDetail>
      <Styled.Actions display="flex" gap="8px" alignItems="flex-start">
        <Styled.ActionButton disableElevation size="small" variant="contained">
          <CheckRounded />
        </Styled.ActionButton>
        <Styled.ActionButton size="small" variant="outlined" color="error">
          <CloseRounded />
        </Styled.ActionButton>
        {/*<Styled.ActionButton disableElevation size="small" variant="contained" color="success">*/}
        {/*  <HowToRegRounded />*/}
        {/*</Styled.ActionButton>*/}
        {/*<Styled.ActionButton disableElevation size="small" variant="contained" color="warning">*/}
        {/*  <CoffeeRounded />*/}
        {/*</Styled.ActionButton>*/}
      </Styled.Actions>
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
  Status: styled(Box)(({ theme }) => ({
    gridColumn: '1',
    gridRow: '1 / 4',
    borderRadius: '0 4px 4px 0',
    [`&.${OrderStatusEnum.OrderPlaced}`]: {
      backgroundColor: theme.palette.error.main,
    },
    [`&.${OrderStatusEnum.OrderAccepted}`]: {
      backgroundColor: theme.palette.primary.main,
    },
    [`&.${OrderStatusEnum.WaitingForPickup}`]: {
      backgroundColor: theme.palette.warning.main,
    },
    [`&.${OrderStatusEnum.PickupComplete}`]: {
      backgroundColor: theme.palette.success.main,
    },
    [`&.${OrderStatusEnum.OrderCancelled}`]: {
      backgroundColor: theme.palette.grey[500],
    },
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
    },
  }),
  Actions: styled(Box)({
    gridColumn: '4',
    gridRow: '1 / 4',
  }),
  ActionButton: styled(Button)({
    height: '64px',
  }),
};
import DeleteDialog from '@/components/DeleteDialog';
import { OrderStatusEnum } from '@/type/order';
import {
  AddRounded,
  CheckRounded,
  CloseRounded,
  CoffeeRounded,
  ExpandMoreRounded,
  FormatListBulletedRounded,
  HowToRegRounded,
} from '@mui/icons-material';
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
import React, { useState } from 'react';

const OrderPage = (): React.ReactNode => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
  };

  return (
    <>
      <Box display="grid" gap="16px">
        <Box display="flex" gap="8px">
          <FormatListBulletedRounded color="primary" />
          <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
            Order
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box display="flex" justifyContent="space-between">
            <Button disableElevation size="medium" variant="contained" startIcon={<AddRounded />}>
              Add New Order
            </Button>
          </Box>
          {[...Array(20)].map((_, index) => (
            <Styled.ListItem key={index}>
              <Styled.Status className={index === 3 ? OrderStatusEnum.OrderPlaced : OrderStatusEnum.WaitingForPickup} />
              <Styled.NumberTypography fontSize="28px" fontWeight="500">
                {numeral(index).format('000')}
              </Styled.NumberTypography>
              <Box display="flex" alignItems="flex-end" gap="16px">
                <Typography fontSize="12px">
                  주문자/팀명
                </Typography>
                <Typography fontSize="12px" color="grey">
                  010-3333-4444
                </Typography>
                <Typography fontSize="14px" color={(theme) => theme.palette.error.main} flex={1}>
                  client note
                </Typography>
                <Typography fontSize="12px" color="grey">
                  {dayjs().format('h:mma')}
                </Typography>
              </Box>
              <Divider />
              <Styled.OrderDetail disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreRounded />} >
                  <Typography>
                    합계 수량 0
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" gap="8px">
                    <Typography>
                      Menu Name
                    </Typography>
                    <Typography color="grey">
                      Option1, Option2, Option3,
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Styled.OrderDetail>
              <Styled.Actions display="flex" gap="8px" alignItems="flex-start">
                <Styled.ActionButton disableElevation size="small" variant="contained">
                  <CheckRounded />
                </Styled.ActionButton>
                <Styled.ActionButton size="small" variant="outlined" color="error" onClick={handleDeleteOpen}>
                  <CloseRounded />
                </Styled.ActionButton>
                <Styled.ActionButton disableElevation size="small" variant="contained" color="success">
                  <HowToRegRounded />
                </Styled.ActionButton>
                <Styled.ActionButton disableElevation size="small" variant="contained" color="warning">
                  <CoffeeRounded />
                </Styled.ActionButton>
              </Styled.Actions>
            </Styled.ListItem>
          ))}
        </Box>
      </Box>

      {deleteOpen && (
        <DeleteDialog onDone={handleDelete} onClose={handleClose} />
      )}
    </>
  );
}

export default OrderPage;

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
import type { CartItem } from '@/pages/guestOrder/atoms';
import { AddRounded, ClearRounded, RemoveRounded } from '@mui/icons-material';
import { Alert, Box, Button, ButtonGroup, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data: CartItem & { remain: number; error: boolean };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = (props: Props): React.ReactNode => {
  const { data, onIncrease, onDecrease, onRemove } = props;

  const isIncreaseDisable = data.quantity >= data.remain;

  return (
    <Styled.Wrapper>
      <Styled.ImageWrapper>
        <img src={data.menuInfo.menuImageUrl} alt={data.menuInfo.menuName} />
      </Styled.ImageWrapper>
      <Box display="flex" flexDirection="column" gap="8px">
        <Box display="flex" justifyContent="space-between" gap="16px">
          <Typography fontSize="16px" fontWeight="500">
            {data.menuInfo.menuName}
          </Typography>

          <Styled.RemoveButton variant="text" size="small" color="inherit" onClick={onRemove}>
            <ClearRounded />
          </Styled.RemoveButton>
        </Box>

        <Typography fontSize="14px" fontWeight="300">
          {data.options.join(', ')}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" gap="8px" gridColumn="span 2">
        <Styled.QuantityWrapper size="small">
          <Button disableElevation variant="contained" onClick={onDecrease}>
            <RemoveRounded />
          </Button>
          <Styled.Quantity disableRipple disabled={data.error}>{data.quantity}</Styled.Quantity>
          <Button disableElevation variant="contained" onClick={onIncrease} disabled={isIncreaseDisable}>
            <AddRounded />
          </Button>
        </Styled.QuantityWrapper>
      </Box>
      {data.error && (
        <Box gridColumn="span 2">
          <Alert severity="error">
            주문할 수 없습니다. <strong>잔여 수량 : {data.remain}</strong>
          </Alert>
        </Box>
      )}
    </Styled.Wrapper>
  );
};

export default CartItem;

const Styled = {
  Wrapper: styled('li')(({ theme }) => ({
    paddingBottom: '16px',
    display: 'grid',
    gridTemplateColumns: '68px 1fr',
    gridTemplateRows: '1fr auto',
    columnGap: '16px',
    rowGap: '8px',
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  })),
  ImageWrapper: styled('div')(({ theme }) => ({
    aspectRatio: '1',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.grey[200],
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  })),
  QuantityWrapper: styled(ButtonGroup)({
    '& .MuiButtonGroup-grouped': {
      padding: '4px',
      minWidth: '32px !important',
    },
  }),
  Quantity: styled(Button)({
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  }),
  RemoveButton: styled(Button)({
    padding: '0',
    minWidth: '24px !important',
  }),
};
import type { CartItem } from '@/pages/guestOrder/atoms';
import { Box, Button, ButtonGroup, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem = (props: Props): React.ReactNode => {
  const { data, onIncrease, onDecrease } = props;

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

          <Styled.QuantityWrapper size="small">
            <Button disableElevation variant="contained" onClick={onDecrease}>-</Button>
            <Styled.Quantity disableRipple>{data.quantity}</Styled.Quantity>
            <Button disableElevation variant="contained" onClick={onIncrease}>+</Button>
          </Styled.QuantityWrapper>
        </Box>
        <Typography fontSize="14px" fontWeight="300">
          {data.options.join(', ')}
        </Typography>
      </Box>
    </Styled.Wrapper>
  );
};

export default CartItem;

const Styled = {
  Wrapper: styled('li')({
    display: 'grid',
    gridTemplateColumns: '68px 1fr',
    gap: '16px',
  }),
  ImageWrapper: styled('div')(({ theme }) => ({
    aspectRatio: '1',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.grey[200],
  })),
  QuantityWrapper: styled(ButtonGroup)({
    '& .MuiButtonGroup-grouped': {
      minWidth: '32px !important',
    },
  }),
  Quantity: styled(Button)({
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  }),
};
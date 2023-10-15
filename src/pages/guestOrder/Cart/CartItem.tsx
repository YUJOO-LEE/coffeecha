import type { CartItem } from '@/pages/guestOrder/atoms';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data: CartItem;
}

const CartItem = (props: Props): React.ReactNode => {
  const { data } = props;

  return (
    <Styled.Wrapper>
      <Styled.ImageWrapper>
        <img src={data.menuInfo.menuImageUrl} alt={data.menuInfo.menuName} />
      </Styled.ImageWrapper>
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="16px" fontWeight="500">
          {data.menuInfo.menuName}
        </Typography>
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
};
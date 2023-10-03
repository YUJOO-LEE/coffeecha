import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const CartItem = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <Styled.ImageWrapper>
        <img src="url" alt="title" />
      </Styled.ImageWrapper>
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="16px" fontWeight="500">
          title
        </Typography>
        <Typography fontSize="14px" fontWeight="300">
          option
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
import Cart from '@/pages/guestOrder/components/Cart';
import ClientInfo from '@/pages/guestOrder/components/ClientInfo';
import MenuList from '@/pages/guestOrder/components/MenuList';
import { Box, styled } from '@mui/material';
import React from 'react';

const GuestOrderPage = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <Styled.Box>
        <ClientInfo />
        <MenuList />
        <Cart />
      </Styled.Box>
    </Styled.Wrapper>
  );
};

export default GuestOrderPage;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[50],
  })),
  Box: styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '640px',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  })),
};
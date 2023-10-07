import Cart, { maxWidth } from '@/pages/guestOrder/Cart';
import ClientInfo from '@/pages/guestOrder/ClientInfo';
import MenuList from '@/pages/guestOrder/Menu';
import MenuHeader from '@/pages/guestOrder/Menu/MenuHeader';
import { Box, styled } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const GuestOrderPage = (): React.ReactNode => {
  const { clientKey } = useParams();

  if (!clientKey) { // TODO
    return (
      <div>
        No client data
      </div>
    );
  }

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <ClientInfo clientKey={clientKey} />
        <MenuHeader />
        <MenuList clientKey={clientKey} />
      </Styled.Box>
      <Cart />
    </Styled.Wrapper>
  );
};

export default GuestOrderPage;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    width: '100dvw',
    minHeight: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    backgroundColor: theme.palette.grey[100],
  })),
  Box: styled(Box)({
    padding: '24px',
    width: '100%',
    maxWidth: '640px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      marginBottom: 'calc(56px + 24px)',
    },
  }),
};
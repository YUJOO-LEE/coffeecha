import GuestOrderHeader from '@/pages/guestOrder/components/Header';
import { styled } from '@mui/material';
import React from 'react';

const GuestLayout = (props: React.PropsWithChildren): React.ReactNode => {
  const { children } = props;

  return (
    <Styled.Wrapper>
      <GuestOrderHeader
        title="주문 상세"
        goBackAction={() => {}}
      />
      <Styled.Content>
        {children}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default GuestLayout;

const Styled = {
  Wrapper: styled('div')(({ theme }) => ({
    height: '100dvh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
  })),
  Content: styled('div')({
    padding: '24px',
    width: '100%',
    maxWidth: '640px',
  }),
};
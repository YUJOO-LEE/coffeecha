import GuestOrderHeader from '@/pages/guestOrder/components/Header';
import { styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  actionComponent?: React.ReactNode;
}

const GuestLayout = (props: React.PropsWithChildren<Props>): React.ReactNode => {
  const { title, actionComponent, children } = props;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Styled.Wrapper>
      <GuestOrderHeader
        title={title}
        goBackAction={handleBack}
        actionComponent={actionComponent}
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
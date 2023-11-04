import { styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
}

export const ProfileItem = (props: React.PropsWithChildren<Props>): React.ReactNode => {
  const { title, children } = props;

  return (
    <Styled.Wrapper>
      <Styled.Title>
        {title}
      </Styled.Title>
      <div>
        {children}
      </div>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  }),
  Title: styled(Typography)({
    minWidth: '100px',
    fontWeight: '700',
  }),
  Content: styled('div')({

  }),
};
import { styled } from '@mui/material';
import React from 'react';

const Closed = (): React.ReactNode => {
  return (
    <Styled.Wrapper>

    </Styled.Wrapper>
  );
};

export default Closed;

const Styled = {
  Wrapper: styled('div')({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};
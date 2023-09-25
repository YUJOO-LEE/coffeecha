import { Button, ButtonGroup, styled } from '@mui/material';
import React from 'react';

const MenuHeader = (): React.ReactNode => {
  return (
    <Styled.Wrapper fullWidth variant="contained" size="large">
      <Button>
        coffee
      </Button>
      <Button>
        dessert
      </Button>
    </Styled.Wrapper>
  );
};

export default MenuHeader;

const Styled = {
  Wrapper: styled(ButtonGroup)({
    overflow: 'hidden',
    borderRadius: '16px',
    '& button': {
      padding: '12px',
    },
  }),
};
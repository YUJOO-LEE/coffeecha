import { Button, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import React from 'react';

interface IProps {
  onClick: () => void;
}

const IconButton = (props: React.PropsWithChildren<IProps & ButtonProps>) => {
  const { children, onClick, ...restProps } = props;

  return (
    <Styled.Button size="small" color="inherit" onClick={onClick} {...restProps}>
      {children}
    </Styled.Button>
  );
}

export default IconButton;

const Styled = {
  Button: styled(Button)({
    border: 'none',
    width: 'auto',
    aspectRatio: '1',
    minWidth: 'unset',
    padding: '4px',
    borderRadius: '4px',
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
    },
  }),
};
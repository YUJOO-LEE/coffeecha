import { Button, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  icon: React.ReactNode;
  url: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const GlobalNavigationButton = (props: Props): React.ReactNode => {
  const { open, icon, url, label, isSelected, onClick } = props;

  return (
    <Styled.NavButton
      key={url}
      size="large"
      startIcon={icon}
      onClick={onClick}
      variant={isSelected ? 'contained' : 'text'}
      open={open}
      disableElevation
    >
      <Typography fontSize="14px" whiteSpace="nowrap">
        {label}
      </Typography>
    </Styled.NavButton>
  );
};

const Styled = {
  NavButton: styled(Button, { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ open }) => ({
    minWidth: 'unset',
    padding: open ? '8px 16px' : '8px',
    justifyContent: open ? 'flex-start' : 'center',
    '& .MuiButton-startIcon': {
      marginLeft: open ? '-4px' : 0,
      marginRight: open ? '8px' : 0,
    },
    '& .MuiTypography-root': {
      width: open ? '99px' : 0,
      overflow: 'hidden',
      opacity: open ? 1 : 0,
      display: 'flex',
      transition: '.3s',
    },
  })),
};
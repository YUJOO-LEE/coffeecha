import {
  HomeRounded,
  MenuOpenRounded,
  MenuRounded,
  FormatListBulletedRounded,
  CoffeeRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface INavItem {
  label: string;
  icon?: React.ReactNode;
  url: string;
}

const navList: INavItem[] = [
  {
    label: 'Home',
    url: '/',
    icon: <HomeRounded />,
  },
  {
    label: 'Order',
    url: '/order',
    icon: <FormatListBulletedRounded />,
  },
  {
    label: 'Menu',
    url: '/menu',
    icon: <CoffeeRounded />,
  },
  {
    label: 'Setting',
    url: '/setting',
    icon: <SettingsRounded />,
  },
]

const GNB = (): React.ReactNode => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleMove = (target: string) => () => {
    navigate(target);
  };

  return(
    <Styled.Nav open={open}>
      <Box display="flex" justifyContent="flex-end">
        <Styled.OpenButton size="small" color="inherit" onClick={toggleOpen}>
          {open ? (
            <MenuOpenRounded />
          ) : (
            <MenuRounded />
          )}
        </Styled.OpenButton>
      </Box>
      <Divider />
      {navList.map(({ label, icon, url }) => (
        <Styled.NavButton
          key={url}
          size="large"
          startIcon={icon}
          onClick={handleMove(url)} variant={pathname === url ? 'contained' : 'outlined'}
          open={open}
        >
          <Typography fontSize="14px">
            {label}
          </Typography>
        </Styled.NavButton>
      ))}
    </Styled.Nav>
  );
}

export default GNB;

const Styled = {
  Nav: styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    width: open ? '186px' : '66px' ,
    height: '100dvh',
    padding: '12px 16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    transition: 'width .3s',
  })),
  OpenButton: styled(Button)({
    border: 'none',
    width: 'auto',
    minWidth: 'unset',
    padding: '2px 4px',
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
    },
  }),
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
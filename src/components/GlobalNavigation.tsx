import { clientNavList, userNavList } from '@/assets/navList';
import GlobalNavigationButton from '@/components/GlobalNavigationButton';
import { MenuOpenRounded, MenuRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  clientId?: string;
}

const GlobalNavigation = (props: IProps): React.ReactNode => {
  const { clientId } = props;
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
    <Styled.NavWrapper open={open}>
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
      <Styled.NavList
        justifyContent={clientId ? 'space-between' : 'flex-start'}
      >
        <Box display="flex" flexDirection="column" gap="8px">
          {clientId ? (
            clientNavList(clientId).map(({ label, icon, url }) => (
              <GlobalNavigationButton
                key={url}
                open={open}
                icon={icon}
                url={url}
                label={label}
                onClick={handleMove(url)}
                isSelected={pathname === url}
              />
            ))
          ) : (
            <GlobalNavigationButton
              open={open}
              icon={userNavList[0].icon}
              url={userNavList[0].url}
              label={userNavList[0].label}
              onClick={handleMove(userNavList[0].url)}
              isSelected={pathname === userNavList[0].url}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          {clientId && (<Divider />)}
          {userNavList.slice(1).map(({ label, icon, url }) => (
            <GlobalNavigationButton
              key={url}
              open={open}
              icon={icon}
              url={url}
              label={label}
              onClick={handleMove(url)}
              isSelected={pathname === url}
            />
          ))}
        </Box>
      </Styled.NavList>
    </Styled.NavWrapper>
  );
}

export default GlobalNavigation;

const Styled = {
  NavWrapper: styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
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
  NavList: styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    height: '100%',
  })
};
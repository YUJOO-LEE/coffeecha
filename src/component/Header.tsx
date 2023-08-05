import CustomerList from '@/component/CustomerList';
import { LoopRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  isOffsetTop?: boolean;
}

const Header = (props: IProps): React.ReactNode => {
  const { isOffsetTop } = props;
  const [listOpen, setListOpen] = useState(false);

  const handleListOpen = () => {
    setListOpen(true);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  return (
    <Styled.HeaderBar isOffsetTop={isOffsetTop}>
      <Box display="flex" gap="8px" alignItems="center">
        <Typography variant="h2" fontSize="20px" fontWeight="500">
          Name
        </Typography>
        <Divider orientation="vertical" sx={{ height: '50%' }} />
        <Typography color="grey" fontSize="12px" fontWeight="300">
          서울특별시 강남구 테헤란로 427
        </Typography>
      </Box>
      <Styled.ControlButton size="small" color="inherit" onClick={handleListOpen}>
        <LoopRounded />
      </Styled.ControlButton>

      <CustomerList open={listOpen} onClose={handleListClose} />
    </Styled.HeaderBar>
  );
}

export default Header;

const Styled = {
  HeaderBar: styled('div')<{
    isOffsetTop?: boolean;
  }>(({ theme, isOffsetTop }) => ({
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: isOffsetTop ? undefined : `0 5px 5px rgba(0, 0, 0, 0.05)`,
    zIndex: 10,
  })),
  ControlButton: styled(Button)({
    border: 'none',
    width: 'auto',
    minWidth: 'unset',
    padding: '4px',
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
    },
  }),
};
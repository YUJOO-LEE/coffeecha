import IconButton from '@/components/IconButton';
import ClientList from '@/pages/SalesManagement/components/ClientList';
import { CloseRounded } from '@mui/icons-material';
import { Button, Card, DialogContent, DialogTitle, Drawer, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ClientListDrawer = (props: IProps): React.ReactNode => {
  const { open, onClose } = props;

  const [isOffsetTop, setIsOffsetTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setIsOffsetTop(!!e.currentTarget.offsetTop);
  }

  return (
    <Drawer
      open={open}
      anchor="top"
      hideBackdrop
      PaperProps={{
        style: {
          position: 'relative',
          width: '100dvw',
          height: '100dvh',
        },
      }}
    >
      <Styled.Title isOffsetTop={isOffsetTop}>
        <Typography fontSize="inherit" fontWeight="inherit">
          Client List
        </Typography>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Styled.Title>
      <Styled.Content onScroll={handleScroll}>
        <ClientList />
      </Styled.Content>
    </Drawer>
  );
}

export default ClientListDrawer;

const Styled = {
  Title: styled(DialogTitle)<{
    isOffsetTop?: boolean;
  }>(({ isOffsetTop }) => ({
    height: '50px',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: isOffsetTop ? `0 5px 10px rgba(0, 0, 0, 0.05)` : undefined,
  })),
  Content: styled(DialogContent)(({ theme }) => ({
    padding: '24px !important',
    backgroundColor: theme.palette.grey[100],
  })),
  ListItem: styled(Card)(({ theme }) => ({
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'repeat(3, auto)',
    gap: '8px',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  })),
  SelectButton: styled(Button)({
    gridColumn: '2',
    gridRow: '1 / 4',
  }),
};
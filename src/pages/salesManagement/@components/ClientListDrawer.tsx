import IconButton from '@/components/IconButton';
import ClientList from '@/pages/salesManagement/@components/ClientList';
import isPropValid from '@emotion/is-prop-valid';
import { CloseRounded } from '@mui/icons-material';
import { Box, Button, Card, DialogContent, DialogTitle, Drawer, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ClientListDrawer = (props: Props): React.ReactNode => {
  const { open, onClose } = props;
  const navigate = useNavigate();

  const [isOffsetTop, setIsOffsetTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setIsOffsetTop(!!e.currentTarget.offsetTop);
  };

  const handleMove = () => {
    navigate('/');
  };

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
        <Box display="flex" alignItems="center" gap="16px">
          <Typography fontSize="inherit" fontWeight="inherit">
            Client List
          </Typography>
          <Button variant="outlined" size="small" onClick={handleMove}>
            Edit Clients
          </Button>
        </Box>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Styled.Title>
      <Styled.Content onScroll={handleScroll}>
        <ClientList onClose={onClose} />
      </Styled.Content>
    </Drawer>
  );
}

export default ClientListDrawer;

const Styled = {
  Title: styled(DialogTitle, { shouldForwardProp: isPropValid })<{
    isOffsetTop: boolean;
  }>((props) => ({
    height: '50px',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `${props.isOffsetTop ? '0 5px 10px rgba(0, 0, 0, 0.05)' : undefined}`,
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
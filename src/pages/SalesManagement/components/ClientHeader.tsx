import { useGetClientDetail } from '@/apis/queries/client';
import { ClientResponseOpenStatusEnum } from '@/apis/swagger/data-contracts';
import ClientListDrawer from '@/pages/SalesManagement/components/ClientListDrawer';
import { LoopRounded } from '@mui/icons-material';
import { Box, Button, Chip, Divider, styled, Typography } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isOffsetTop?: boolean;
  clientId: number;
}

const ClientHeader = (props: IProps): React.ReactNode => {
  const { isOffsetTop, clientId } = props;
  const navigate = useNavigate();

  const [listOpen, setListOpen] = useState(false);

  const { data: clientDetail, isError } = useGetClientDetail(Number(clientId));

  const handleListOpen = () => {
    setListOpen(true);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  useLayoutEffect(() => {
    if (!isError) return;

    navigate('/');
  }, [isError]);

  return (
    <Styled.HeaderBar isOffsetTop={isOffsetTop}>
      <Box display="flex" gap="8px" alignItems="center">
        <Chip
          size="small"
          variant="filled"
          color={clientDetail?.openStatus === ClientResponseOpenStatusEnum.OPEN ? 'success' : 'default'}
          label={clientDetail?.openStatus}
        />
        <Typography variant="h2" fontSize="20px" fontWeight="500">
          {clientDetail?.clientName}
        </Typography>
        <Divider orientation="vertical" sx={{ height: '50%' }} />
        <Typography color="grey" fontSize="12px" fontWeight="300">
          {clientDetail?.address}
        </Typography>
      </Box>
      <Styled.ControlButton size="small" color="inherit" onClick={handleListOpen}>
        <LoopRounded />
      </Styled.ControlButton>

      <ClientListDrawer open={listOpen} onClose={handleListClose} />
    </Styled.HeaderBar>
  );
}

export default ClientHeader;

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
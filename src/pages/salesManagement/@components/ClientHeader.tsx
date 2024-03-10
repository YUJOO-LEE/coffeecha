import { ClientResponse, OpenStatus } from '@/apis/swagger/data-contracts';
import { clientStatusLabel } from '@/constants/clientStatus';
import ClientListDrawer from '@/pages/salesManagement/@components/ClientListDrawer';
import { ErrorRounded, LoopRounded } from '@mui/icons-material';
import { Box, Button, Chip, Divider, styled, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface Props {
  isOffsetTop?: boolean;
  clientInfo: ClientResponse;
}

const ClientHeader = (props: Props): React.ReactNode => {
  const { isOffsetTop, clientInfo } = props;

  const [listOpen, setListOpen] = useState(false);

  const isOpenDisabled: boolean = !clientInfo || !dayjs().isSame(dayjs(clientInfo?.businessDate), 'd');

  const handleListOpen = () => {
    setListOpen(true);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  return (
    <Styled.HeaderBar isOffsetTop={isOffsetTop}>
      <Box display="flex" gap="8px" alignItems="center">
        <Box display="flex" gap="4px" alignItems="center">
          {clientInfo.openStatus === OpenStatus.OPEN && isOpenDisabled && (
            <Tooltip title="설정된 영업 예정일이 오늘 날짜와 다릅니다. 영업 예정일 당일에만 주문받을 수 있습니다." arrow>
              <ErrorRounded color="error" />
            </Tooltip>
          )}
          <Chip
            size="small"
            variant="filled"
            color={clientInfo.openStatus === OpenStatus.OPEN ? 'success' : 'default'}
            label={clientStatusLabel[clientInfo.openStatus]}
          />
        </Box>
        <Typography variant="h2" fontSize="20px" fontWeight="500">
          {clientInfo.clientName}
        </Typography>
        <Divider orientation="vertical" sx={{ height: '50%' }} />
        <Typography color="grey" fontSize="12px" fontWeight="300">
          {clientInfo.address}
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
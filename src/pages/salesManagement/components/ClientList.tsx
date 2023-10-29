import { useGetClientList } from '@/apis/queries/client';
import { OpenStatus } from '@/apis/swagger/data-contracts';
import { CheckRounded, DownloadDoneRounded, ErrorRounded, ManageAccountsRounded } from '@mui/icons-material';
import { Box, Button, Card, Chip, Divider, styled, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  onClose?: () => void;
  isEditMote?: boolean;
}

const ClientList = (props: Props): React.ReactNode => {
  const { isEditMote, onClose } = props;
  const params = useParams();
  const navigate = useNavigate();

  const { data: clientList } = useGetClientList();

  const handleEdit = (clientId: number) => () => {
    navigate(`/${clientId}/settings`);
    onClose?.();
  };

  const handleSelect = (clientId: number) => () => {
    navigate(`/${clientId}/`);
    onClose?.();
  };

  return (
    <Box display="grid" gap="16px">
      {clientList?.map(({ openStatus, clientId, clientName, phoneNumber, businessDate, address }) => (
        <Styled.ListItem key={clientId}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Box display="flex" alignItems="center" gap="8px">
              {openStatus === OpenStatus.OPEN && (
              <Box display="flex" gap="4px" alignItems="center">
                {openStatus === OpenStatus.OPEN && !dayjs().isSame(dayjs(businessDate), 'd') && (
                  <Tooltip title="Store is open but today is not opening day. Unable to take orders until opening day." arrow>
                    <ErrorRounded color="error" />
                  </Tooltip>
                )}
                <Chip
                  size="small"
                  variant="filled"
                  color="success"
                  label={openStatus}
                />
              </Box>
              )}

              <Typography>
                {clientName}
              </Typography>
              <Typography fontSize="12px" color="grey">
                {phoneNumber}
              </Typography>
            </Box>
            <Typography fontSize="12px" color="grey">
              {dayjs(businessDate).format('MMM D, YYYY')}
            </Typography>
          </Box>
          <Divider />
          <Typography fontSize="12px" color="grey">
            {address}
          </Typography>
          <Styled.Actions>
            {isEditMote && (
              <Button size="small" variant="outlined" onClick={handleEdit(clientId!)}>
                <ManageAccountsRounded />
              </Button>
            )}
            {Number(params.clientId) === clientId ? (
              <Button disableElevation size="small" variant="contained" disabled>
                <DownloadDoneRounded />
              </Button>
            ) : (
              <Button disableElevation size="small" variant="contained" onClick={handleSelect(clientId!)}>
                <CheckRounded />
              </Button>
            )}
          </Styled.Actions>
        </Styled.ListItem>
      ))}
    </Box>
  );
}

export default ClientList;

const Styled = {
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
  Actions: styled(Box)({
    gridColumn: '2',
    gridRow: '1 / 4',
    display: 'flex',
    gap: '8px',
  }),
};
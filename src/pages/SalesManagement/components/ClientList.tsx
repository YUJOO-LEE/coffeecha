import { useGetClientList } from '@/apis/queries/client';
import { CheckRounded, DownloadDoneRounded } from '@mui/icons-material';
import { Box, Button, Card, Divider, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IProps {
  onClose?: () => void;
}

const ClientList = (props: IProps): React.ReactNode => {
  const { onClose } = props;
  const params = useParams();
  const navigate = useNavigate();

  const { data: clientList } = useGetClientList(import.meta.env.VITE_TEST_USER_ID);

  const handleMove = (clientId: number) => () => {
    navigate(`/${clientId}/`);
    onClose?.();
  };

  return (
    <Box display="grid" gap="16px">
      {clientList?.map(({ clientId, clientName, phoneNumber, businessDate, address }) => (
        <Styled.ListItem key={clientId}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Box display="flex" alignItems="center" gap="8px">
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
          {Number(params.clientId) === clientId ? (
            <Styled.SelectButton size="small" variant="contained" disabled>
              <DownloadDoneRounded />
            </Styled.SelectButton>
          ) : (
            <Styled.SelectButton size="small" variant="contained" onClick={handleMove(clientId!)}>
              <CheckRounded />
            </Styled.SelectButton>
          )}
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
  SelectButton: styled(Button)({
    gridColumn: '2',
    gridRow: '1 / 4',
  }),
};
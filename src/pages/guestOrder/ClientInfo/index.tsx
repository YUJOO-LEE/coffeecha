import { useGetClientInfoForGuest } from '@/apis/queries/guestOrder';
import { Box, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  clientKey: string
}

const ClientInfo = (props: IProps): React.ReactNode => {
  const { clientKey } = props;

  const { data: clientInfo } = useGetClientInfoForGuest(clientKey);

  return (
    <Styled.Wrapper>
      {clientInfo ? (
        <Typography variant="h1" fontSize="24px" fontWeight="500">
          {clientInfo.clientName}
        </Typography>
      ) : (
        <Skeleton />
      )}
      <Box display="grid" gap="4px">
        {clientInfo ? (
          <Typography fontSize="14px" fontWeight="300" color={(theme) => theme.palette.grey[500]}>
            {clientInfo.address}
          </Typography>
        ) : (
          <Skeleton />
        )}
        {clientInfo ? (
          <Typography fontSize="14px" fontWeight="300" color={(theme) => theme.palette.grey[500]}>
            {clientInfo.phoneNumber}
          </Typography>
        ) : (
          <Skeleton />
        )}
      </Box>
    </Styled.Wrapper>
  );
};

export default ClientInfo;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    padding: '24px',
    display: 'grid',
    gap: '16px',
    overflow: 'hidden',
    borderRadius: '16px',
    backgroundColor: theme.palette.background.default,
  })),
};
import { OrderClientResponse } from '@/apis/swagger/data-contracts';
import { Box, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data?: OrderClientResponse;
}

const ClientInfo = (props: Props): React.ReactNode => {
  const { data } = props;

  return (
    <Styled.Wrapper>
      {data ? (
        <Typography variant="h1" fontSize="24px" fontWeight="500">
          {data.userName}
        </Typography>
      ) : (
        <Skeleton />
      )}
      <Box display="grid" gap="4px">
        {data ? (
          <Typography fontWeight="300" color={(theme) => theme.palette.grey[500]}>
            {data.clientName} | {data.address}
          </Typography>
        ) : (
          <Skeleton />
        )}
        {data ? (
          <Typography fontWeight="300" color={(theme) => theme.palette.grey[500]}>
            {data.userPhoneNumber}
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
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default,
  })),
};
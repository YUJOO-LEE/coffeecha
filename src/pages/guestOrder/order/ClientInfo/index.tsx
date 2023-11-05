import { OrderClientResponse } from '@/apis/swagger/data-contracts';
import { Box, Button, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  data?: OrderClientResponse;
}

const ClientInfo = (props: Props): React.ReactNode => {
  const { data } = props;
  const navigate = useNavigate();

  const handleList = () => {
    navigate('/order/list');
  };

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
      {data && (
        <Styled.GoToList variant="contained" disableElevation onClick={handleList}>
          주문조회
        </Styled.GoToList>
      )}
    </Styled.Wrapper>
  );
};

export default ClientInfo;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: '24px',
    display: 'grid',
    gap: '16px',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default,
  })),
  GoToList: styled(Button)({
    position: 'absolute',
    top: '16px',
    right: '16px',
  }),
};
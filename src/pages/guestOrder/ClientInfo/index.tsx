import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const ClientInfo = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <Typography variant="h1" fontSize="24px" fontWeight="500">
        커피팔아요
      </Typography>
      <Box display="grid" gap="4px">
        <Typography fontSize="14px" color={(theme) => theme.palette.grey[500]}>
          강남 못참지
        </Typography>
        <Typography fontSize="14px" color={(theme) => theme.palette.grey[500]}>
          010-1111-1232
        </Typography>
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
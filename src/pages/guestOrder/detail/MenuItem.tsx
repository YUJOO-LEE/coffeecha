import { Box, styled, Typography } from '@mui/material';
import React from 'react';

export const MenuItem = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <Styled.ImageWrapper>
        <img src="url" alt="alt" />
      </Styled.ImageWrapper>
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="16px" fontWeight="500">
          menuName
        </Typography>

        <Typography fontSize="14px" fontWeight="300">
          options, options, options
        </Typography>

        <Typography fontSize="14px" fontWeight="500">
          수량: 0
        </Typography>
      </Box>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('li')(({ theme }) => ({
    paddingTop: '16px',
    display: 'grid',
    gridTemplateColumns: '68px 1fr',
    gridTemplateRows: '1fr auto',
    columnGap: '16px',
    rowGap: '8px',
    borderTop: `1px solid ${theme.palette.grey[200]}`
  })),
  ImageWrapper: styled('div')(({ theme }) => ({
    aspectRatio: '1',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.grey[200],
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  })),
};
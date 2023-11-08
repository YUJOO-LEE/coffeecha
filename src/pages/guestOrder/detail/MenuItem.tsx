import { OrderMenuInfo } from '@/apis/swagger/data-contracts';
import { Box, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data?: OrderMenuInfo;
  isLoading?: boolean;
}

export const MenuItem = (props: Props): React.ReactNode => {
  const { data, isLoading } = props;

  return (
    <Styled.Wrapper>
      {isLoading ? (
        <Styled.ImageWrapper>
          <Skeleton width="100%" height="100%" sx={{ transform: 'scale(1)'}} />
        </Styled.ImageWrapper>
      ) : (
        data?.imageUrl && (
          <Styled.ImageWrapper>
            <img src={data.imageUrl} alt="alt" />
          </Styled.ImageWrapper>
        )
      )}
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="16px" fontWeight="500">
          {isLoading ? (<Skeleton />) : data?.menuName}
        </Typography>

        <Typography fontSize="14px" fontWeight="300">
          {isLoading ? (<Skeleton />) : data?.menuOption}
        </Typography>

        <Typography fontSize="14px" fontWeight="500">
          {isLoading ? (<Skeleton />) : `수량: ${data?.orderQuantity}`}
        </Typography>
      </Box>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('li')(({ theme }) => ({
    paddingTop: '16px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: '1fr auto',
    columnGap: '16px',
    rowGap: '8px',
    borderTop: `1px solid ${theme.palette.grey[200]}`
  })),
  ImageWrapper: styled('div')(({ theme }) => ({
    width: '68px',
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
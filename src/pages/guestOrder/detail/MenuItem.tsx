import { OrderMenuInfo } from '@/apis/swagger/data-contracts';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data: OrderMenuInfo;
}

export const MenuItem = (props: Props): React.ReactNode => {
  const { data } = props;

  return (
    <Styled.Wrapper>
      {data.imageUrl && (
        <Styled.ImageWrapper>
          <img src={data.imageUrl} alt="alt" />
        </Styled.ImageWrapper>
      )}
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="16px" fontWeight="500">
          {data.menuName}
        </Typography>

        <Typography fontSize="14px" fontWeight="300">
          {data.menuOption}
        </Typography>

        <Typography fontSize="14px" fontWeight="500">
          수량: {data.orderQuantity}
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
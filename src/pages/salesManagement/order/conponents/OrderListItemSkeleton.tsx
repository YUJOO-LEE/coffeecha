import { Box, Card, Divider, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

export const OrderListItemSkeleton = (): React.ReactNode => {
  return (
    <Styled.ListItem>
      <Styled.Status>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Styled.Status>
      <Styled.NumberTypography fontSize="28px">
        <Skeleton width="70%" />
      </Styled.NumberTypography>
      <Skeleton />
      <Divider />
      <Skeleton />
    </Styled.ListItem>
  );
};

const Styled = {
  ListItem: styled(Card)({
    padding: '16px 16px 16px 0',
    display: 'grid',
    gridTemplateColumns: '10px 80px 1fr',
    gridTemplateRows: '20px 3px auto',
    gap: '8px',
  }),
  Status: styled(Box)({
    gridColumn: '1',
    gridRow: 'span 3',
    borderRadius: '0 4px 4px 0',
    overflow: 'hidden',
  }),
  NumberTypography: styled(Typography)({
    gridColumn: '2',
    gridRow: 'span 3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};
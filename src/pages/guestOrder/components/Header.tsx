import { ArrowBackIosNewRounded } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
  goBackAction?: () => void;
  actionComponent?: React.ReactNode;
}

const GuestOrderHeader = (props: IProps): React.ReactNode => {
  const { title, goBackAction, actionComponent } = props;

  return (
    <Styled.Wrapper>
      <Box>
        <Button size="small" variant="text" color="inherit" onClick={goBackAction} sx={{ padding: '8px', minWidth: '0' }}>
          <ArrowBackIosNewRounded sx={{ width: '20px', height: '20px' }} />
        </Button>
      </Box>
      <Typography variant="h6" fontWeight="700" align="center">
        {title}
      </Typography>
      <Box>
        {actionComponent}
      </Box>
    </Styled.Wrapper>
  );
};

export default GuestOrderHeader;

const Styled = {
  Wrapper: styled('div')(({ theme }) => ({
    minHeight: '56px',
    position: 'sticky',
    padding: '8px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'center',
    gap: '8px',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  })),
};
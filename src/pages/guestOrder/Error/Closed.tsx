import { EventBusyRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  openingDate: string;
}

const Closed = (props: IProps): React.ReactNode => {
  const { openingDate } = props;

  return (
    <Styled.Wrapper>
      <Styled.Icon />
      <Typography fontSize="16px" fontWeight="500" color={(theme) => theme.palette.error.main} align="center">
        The coffee cart has not opened<br />
        Please check the opening date <strong>{openingDate}</strong>
      </Typography>
    </Styled.Wrapper>
  );
};

export default Closed;

const Styled = {
  Wrapper: styled('div')({
    width: '100dvw',
    height: '100dvh',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  }),
  Icon: styled(EventBusyRounded)(({ theme }) => ({
    width: '48px',
    height: '48px',
    fill: theme.palette.error.main,
  })),
};
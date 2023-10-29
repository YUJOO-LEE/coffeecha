import { EventBusyRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  openingDate: string;
}

const CoffeechaClosedPage = (props: Props): React.ReactNode => {
  const { openingDate } = props;

  return (
    <Styled.Wrapper>
      <Styled.Icon />
      <Typography fontSize="16px" fontWeight="500" color={(theme) => theme.palette.error.main} align="center">
        커피차가 오픈하지 않았습니다.<br />
        오픈 예정일(<strong>{openingDate}</strong>)을 확인 해 주세요.
      </Typography>
    </Styled.Wrapper>
  );
};

export default CoffeechaClosedPage;

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
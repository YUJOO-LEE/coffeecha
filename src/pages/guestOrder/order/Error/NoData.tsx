import { ReportRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import React from 'react';

const NoData = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <Styled.Icon />
      <Typography fontSize="16px" fontWeight="500" color={(theme) => theme.palette.error.main} align="center">
        커피차를 찾을 수 없습니다.<br />
        요청하신 URL을 다시 확인 해 주세요.
      </Typography>
    </Styled.Wrapper>
  );
};

export default NoData;

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
  Icon: styled(ReportRounded)(({ theme }) => ({
    width: '48px',
    height: '48px',
    fill: theme.palette.error.main,
  })),
};
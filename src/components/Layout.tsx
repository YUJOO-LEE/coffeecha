import { useGetClientDetail } from '@/apis/queries/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import { ServerSentAlarm } from '@/components/ServerSentAlarm';
import ClientHeader from '@/pages/salesManagement/@components/ClientHeader';
import { Box, styled } from '@mui/material';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const Layout = (): React.ReactNode => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [isOffsetTop, setIsOffsetTop] = useState(true);

  const { data: clientInfo, isError } = useGetClientDetail(Number(clientId), !clientId);

  const handleScroll = useCallback((e: React.WheelEvent<HTMLElement>) => {
    setIsOffsetTop((e.target as HTMLElement).scrollTop === 0);
  }, []);

  useLayoutEffect(() => {
    if (!isError) return;

    navigate('/');
  }, [isError, navigate]);

  return (
    <Box display="flex">
      <ServerSentAlarm />
      <GlobalNavigation clientInfo={clientInfo} />
      <Box flexGrow={1} maxHeight="100dvh" display="grid" gridTemplateRows={clientId ? '50px 1fr' : '1fr'}>
        {clientId && clientInfo && <ClientHeader clientInfo={clientInfo} isOffsetTop={isOffsetTop} />}
        <Styled.Main onScroll={handleScroll}>
          <Outlet />
        </Styled.Main>
      </Box>
    </Box>
  );
};

const Styled = {
  Main: styled('main')(({ theme }) => ({
    padding: '16px 24px 24px',
    backgroundColor: theme.palette.grey[100],
    overflowY: 'auto',
  })),
};
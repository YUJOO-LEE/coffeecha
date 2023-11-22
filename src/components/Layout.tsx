import { useAuth } from '@/apis/queries/auth';
import { useGetClientDetail } from '@/apis/queries/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import ClientHeader from '@/pages/salesManagement/@components/ClientHeader';
import { Box, styled } from '@mui/material';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const Layout = (): React.ReactNode => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [isOffsetTop, setIsOffsetTop] = useState(true);

  useAuth();
  const { data: clientInfo, isError } = useGetClientDetail(Number(clientId));

  const handleScroll = useCallback((e: React.WheelEvent<HTMLElement>) => {
    setIsOffsetTop((e.target as HTMLElement).scrollTop === 0);
  }, []);

  useLayoutEffect(() => {
    if (!isError) return;

    navigate('/');
  }, [isError, navigate]);

  return (
    <Box display="flex">
      <GlobalNavigation clientInfo={clientInfo} />
      <Box flexGrow={1} maxHeight="100dvh" display="grid" gridTemplateRows={clientId ? '50px 1fr' : '1fr'}>
        {clientInfo && <ClientHeader clientInfo={clientInfo} isOffsetTop={isOffsetTop} />}
        <Styled.Main onScroll={handleScroll}>
          <Outlet />
        </Styled.Main>
      </Box>
    </Box>
  );
}

export default Layout;

const Styled = {
  Main: styled('main')(({ theme }) => ({
    padding: '16px 24px 24px',
    backgroundColor: theme.palette.grey[100],
    overflowY: 'auto',
  })),
};
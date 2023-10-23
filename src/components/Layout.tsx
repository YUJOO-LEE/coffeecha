import { useAuth } from '@/apis/queries/auth';
import GlobalNavigation from '@/components/GlobalNavigation';
import ClientHeader from '@/pages/salesManagement/components/ClientHeader';
import { Box, styled } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

const Layout = ({ children }: React.PropsWithChildren):React.ReactNode => {
  const { clientId } = useParams();
  const [isOffsetTop, setIsOffsetTop] = useState(true);

  useAuth();

  const handleScroll = useCallback((e: React.WheelEvent<HTMLElement>) => {
    setIsOffsetTop((e.target as HTMLElement).scrollTop === 0);
  }, []);

  return (
    <Box display="flex">
      <GlobalNavigation clientId={clientId} />
      <Box flexGrow={1} maxHeight="100dvh" display="grid" gridTemplateRows={clientId ? '50px 1fr' : '1fr'}>
        {clientId && <ClientHeader clientId={Number(clientId)} isOffsetTop={isOffsetTop} />}
        <Styled.Main onScroll={handleScroll}>
          {children}
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
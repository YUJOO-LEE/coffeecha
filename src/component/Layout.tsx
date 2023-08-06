import GlobalNavigation from '@/component/GlobalNavigation';
import Header from '@/component/Header';
import { Box, styled } from '@mui/material';
import React, { useCallback, useState } from 'react';

const Layout = ({ children }: React.PropsWithChildren):React.ReactNode => {
  const [isOffsetTop, setIsOffsetTop] = useState(true);

  const handleScroll = useCallback((e: React.WheelEvent<HTMLElement>) => {
    setIsOffsetTop((e.target as HTMLElement).scrollTop === 0);
  }, []);

  return (
    <Box display="flex">
      <GlobalNavigation />
      <Box flexGrow={1} maxHeight="100dvh" display="grid" gridTemplateRows="50px 1fr">
        <Header isOffsetTop={isOffsetTop} />
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
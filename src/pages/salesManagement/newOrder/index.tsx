import { useGetClientDetail } from '@/apis/queries/client';
import { isClosedClient } from '@/util';
import { PointOfSaleRounded } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartList } from './components/CartList';
import { MenuList } from './components/MenuList';
import { Order } from './components/Order';

export const NewOrderPage = (): React.ReactNode => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const { data: clientInfo } = useGetClientDetail(Number(clientId));

  useLayoutEffect(() => {
    if (!isClosedClient(clientInfo)) return;
    navigate(`/${clientId}/order`);
  }, [clientId, clientInfo, navigate]);

  return (
    <Styled.Wrapper>
      <Box display="flex" gap="8px">
        <PointOfSaleRounded color="primary" />
        <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
          NEW ORDER
        </Typography>
      </Box>
      {clientInfo?.clientKey && (
        <Styled.Content>
          <MenuList clientKey={clientInfo.clientKey} />
          <CartList />
          <Order />
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')({
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '16px',
  }),
  Content: styled('div')({
    width: '100%',
    height: '100%',
    paddingBottom: '2px',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1fr 420px',
    gridTemplateRows: '1fr 320px',
    gap: '24px',
  }),
};
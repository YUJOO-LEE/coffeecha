import { useGetClientDetail } from '@/apis/queries/client';
import { CartItem } from '@/pages/guestOrder/order/atoms';
import { isClosedClient } from '@/util';
import { PointOfSaleRounded } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartList } from './components/CartList';
import { MenuList } from './components/MenuList';
import { Order } from './components/Order';

export const NewOrderPage = (): React.ReactNode => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState<CartItem[]>([]);

  const { data: clientInfo } = useGetClientDetail(Number(clientId));

  const handleAdd = (newItem: CartItem) => {
    setCartList((prev) => ([
      ...prev,
      newItem,
    ]));
  };

  const handleDecrease = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      if (newList[index].quantity > 1) {
        newList[index].quantity -= 1;
        return newList;
      }
      return prev;
    });
  };

  const handleIncrease = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      newList[index].quantity += 1;
      return newList;
    });
  };

  const handleRemove = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleReset = () => {
    setCartList([]);
  };

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
          <MenuList clientKey={clientInfo.clientKey} cartList={cartList} onAdd={handleAdd} />
          <CartList clientKey={clientInfo.clientKey} cartList={cartList} onDecrease={handleDecrease} onIncrease={handleIncrease} onRemove={handleRemove} />
          <Order clientKey={clientInfo.clientKey} cartList={cartList} onReset={handleReset} />
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
    gridTemplateRows: '1fr auto',
    gap: '24px',
  }),
};
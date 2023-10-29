import { useGetClientInfoForGuest } from '@/apis/queries/guestOrder';
import { OrderClientResponseOpenStatusEnum } from '@/apis/swagger/data-contracts';
import { cartAtom } from '@/pages/guestOrder/order/atoms';
import Cart, { maxWidth } from '@/pages/guestOrder/order/Cart';
import ClientInfo from '@/pages/guestOrder/order/ClientInfo';
import CoffeechaClosedPage from '@/pages/guestOrder/order/Error/CoffeechaClosedPage';
import CoffeechaLoading from '@/pages/guestOrder/order/Error/CoffeechaLoading';
import NoCoffeechaDataPage from '@/pages/guestOrder/order/Error/NoCoffeechaDataPage';
import MenuList from '@/pages/guestOrder/order/Menu';
import MenuHeader from '@/pages/guestOrder/order/Menu/MenuHeader';
import { Box, styled } from '@mui/material';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GuestOrderPage = (): React.ReactNode => {
  const { clientKey } = useParams();

  const [isLoadingShow, setIsLoadingShow] = useState<boolean>(true);
  const [category, setCategory] = useState<number | 'all'>('all');

  const [cartList, setCartList] = useAtom(cartAtom);

  const { data: clientInfo, isLoading, isError } = useGetClientInfoForGuest(clientKey!, !!clientKey);
  const isWrongClientData = !clientKey || isError || (!isLoading && !clientInfo);
  const isClosed = clientInfo && (clientInfo.openStatus !== OrderClientResponseOpenStatusEnum.OPEN || clientInfo.businessDate !== dayjs().format('YYYY-MM-DD'));

  const handleCategorySelect = (target: number | 'all') => {
    setCategory(target);
  };

  useLayoutEffect(() => {
    if (!clientKey || !cartList[0] || cartList[0].clientKey === clientKey) return;
    // 접속한 client 와 cart 를 담은 client 가 다르면 초기화
    setCartList([]);
  }, [cartList, clientKey, setCartList]);

  useEffect(() => {
    // loading 일정시간 노출 (귀여우니까)
    const timer = setTimeout(() => {
      setIsLoadingShow(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 상황 별 에러 페이지 출력
  if (isWrongClientData) return <NoCoffeechaDataPage />;
  if (isLoading || isLoadingShow) return <CoffeechaLoading />;
  if (isClosed) return <CoffeechaClosedPage openingDate={clientInfo.businessDate} />;

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <ClientInfo data={clientInfo} />
        <MenuHeader clientKey={clientKey} category={category} onCategorySelect={handleCategorySelect} />
        <MenuList clientKey={clientKey} category={category} />
      </Styled.Box>
      <Cart clientKey={clientKey} />
    </Styled.Wrapper>
  );
};

export default GuestOrderPage;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    width: '100dvw',
    minHeight: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    backgroundColor: theme.palette.grey[100],
  })),
  Box: styled(Box)({
    padding: '24px',
    width: '100%',
    maxWidth: '640px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      marginBottom: 'calc(56px + 24px)',
    },
  }),
};
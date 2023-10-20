import { useGetClientInfoForGuest } from '@/apis/queries/guestOrder';
import { ClientResponseOpenStatusEnum } from '@/apis/swagger/data-contracts';
import Cart, { maxWidth } from '@/pages/guestOrder/Cart';
import ClientInfo from '@/pages/guestOrder/ClientInfo';
import Closed from '@/pages/guestOrder/Error/Closed';
import Loading from '@/pages/guestOrder/Error/Loading';
import NoData from '@/pages/guestOrder/Error/NoData';
import MenuList from '@/pages/guestOrder/Menu';
import MenuHeader from '@/pages/guestOrder/Menu/MenuHeader';
import { Box, styled } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GuestOrderPage = (): React.ReactNode => {
  const { clientKey } = useParams();

  const [isLoadingShow, setIsLoadingShow] = useState<boolean>(true);
  const [category, setCategory] = useState<number>();

  const { data: clientInfo, isLoading, isError } = useGetClientInfoForGuest(clientKey!, !!clientKey);
  const isWrongClientData = !clientKey || isError || (!isLoading && !clientInfo);
  const isClosed = clientInfo && (clientInfo.openStatus !== ClientResponseOpenStatusEnum.OPEN || clientInfo.businessDate !== dayjs().format('YYYY-MM-DD'));

  const handleCategorySelect = (target?: number) => {
    setCategory(target);
  };

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
  if (isLoading || isLoadingShow) return <Loading />;
  if (isWrongClientData) return <NoData />;
  if (isClosed) return <Closed openingDate={clientInfo.businessDate} />;

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <ClientInfo data={clientInfo} />
        <MenuHeader onCategorySelect={handleCategorySelect} />
        <MenuList clientKey={clientKey} category={category} />
      </Styled.Box>
      <Cart />
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      marginBottom: 'calc(56px + 24px)',
    },
  }),
};
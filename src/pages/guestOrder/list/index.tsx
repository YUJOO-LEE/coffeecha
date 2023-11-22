import { useGetGuestOrderList } from '@/apis/queries/guestOrder';
import GuestLayout from '@/pages/guestOrder/@components/Layout';
import { GuestLogin } from '@/pages/guestOrder/list/GuestLogin';
import { OrderList } from '@/pages/guestOrder/list/OrderList';
import { guestLoginAtom, guestLoginInfoInitialData } from '@/pages/guestOrder/order/@atoms';
import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import React, { useLayoutEffect } from 'react';

const GuestOrderListPage = (): React.ReactNode => {
  const { enqueueSnackbar } = useSnackbar();

  const [guestLoginInfo, setGuestLoginInfo] = useAtom(guestLoginAtom);

  const isEmpty = !guestLoginInfo.guestName || !guestLoginInfo.phoneNumber;
  const { data, isLoading } = useGetGuestOrderList(guestLoginInfo.guestName, guestLoginInfo.phoneNumber, !isEmpty);

  useLayoutEffect(() => {
    if (data && !data.length) {
      enqueueSnackbar('조회된 주문 정보가 없습니다', { variant: 'error' });
      setGuestLoginInfo(guestLoginInfoInitialData);
    }
  }, [setGuestLoginInfo, data, enqueueSnackbar]);

  return (
    <GuestLayout title="주문 조회">
      {isEmpty ? (
        <GuestLogin />
      ) : (
        <OrderList data={data} isLoading={isLoading} />
      )}
    </GuestLayout>
  );
};

export default GuestOrderListPage;
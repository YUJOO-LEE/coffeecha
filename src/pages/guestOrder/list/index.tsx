import { useGetGuestOrderList } from '@/apis/queries/guestOrder';
import GuestLayout from '@/pages/guestOrder/components/Layout';
import { GuestLogin } from '@/pages/guestOrder/list/GuestLogin';
import { OrderList } from '@/pages/guestOrder/list/OrderList';
import { guestLoginAtom, guestLoginInfoInitialData } from '@/pages/guestOrder/order/atoms';
import { useAtom } from 'jotai';
import React, { useLayoutEffect } from 'react';

const GuestOrderListPage = (): React.ReactNode => {

  const [guestLoginInfo, setGuestLoginInfo] = useAtom(guestLoginAtom);

  const isEmpty = !guestLoginInfo.guestName || !guestLoginInfo.phoneNumber;
  const { data, isError, isLoading } = useGetGuestOrderList(guestLoginInfo.guestName, guestLoginInfo.phoneNumber, !isEmpty);

  useLayoutEffect(() => {
    if (!isError) return;
    setGuestLoginInfo(guestLoginInfoInitialData);
  }, [setGuestLoginInfo, isError]);

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
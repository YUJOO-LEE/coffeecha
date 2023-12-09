import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { ProtectedPageWrapper } from '@/components/ProtectedPageWrapper';
import {
  ClientSettingsPage,
  CollectionPage,
  GuestOrderDetailPage,
  GuestOrderListPage,
  GuestOrderPage,
  HomePage,
  MenuPage,
  NewOrderPage,
  NoCoffeechaDataPage,
  OrderPage,
  SalesManagementPage,
  UserSettingsPage,
} from '@/pages';
import { CoffeechaLoading } from '@/pages/guestOrder/order/Error/CoffeechaLoading';
import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingCircleProgress open={true} />}>
        <ProtectedPageWrapper />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <SalesManagementPage />,
      },
      {
        path: 'collection',
        element: <CollectionPage />,
      },
      {
        path: 'settings',
        element: <UserSettingsPage />,
      },
      {
        path: ':clientId',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'order',
            element: <OrderPage />,
          },
          {
            path: 'order/new',
            element: <NewOrderPage />,
          },
          {
            path: 'menu',
            element: <MenuPage />,
          },
          {
            path: 'settings',
            element: <ClientSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/order',
    element: (
      <Suspense fallback={<CoffeechaLoading />}>
        <Outlet />
      </Suspense>
    ),
    errorElement: <NoCoffeechaDataPage />,
    children: [
      {
        path: 'list',
        element: <GuestOrderListPage />,
      },
      {
        path: 'detail/:orderKey',
        element: <GuestOrderDetailPage />,
      },
      {
        path: ':clientKey?',
        element: <GuestOrderPage />,
      },
    ],
  },
]);

export default routers;
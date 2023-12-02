import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { GuestOrderDetailPage, GuestOrderListPage, GuestOrderPage, Layout } from '@/pages';
import { CollectionPage } from '@/pages/collection';
import { CoffeechaLoading } from '@/pages/guestOrder/order/Error/CoffeechaLoading';
import { NoCoffeechaDataPage } from '@/pages/guestOrder/order/Error/NoCoffeechaDataPage';
import { LoginPage } from '@/pages/login';
import { SalesManagementPage } from '@/pages/salesManagement';
import { HomePage } from '@/pages/salesManagement/home';
import { MenuPage } from '@/pages/salesManagement/menu';
import { NewOrderPage } from '@/pages/salesManagement/newOrder';
import { OrderPage } from '@/pages/salesManagement/order';
import { ClientSettingsPage } from '@/pages/salesManagement/settings';
import { UserSettingsPage } from '@/pages/settings';
import { isLogin } from '@/util/auth';
import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      if (isLogin()) return false;
      return redirect('/login');
    },
    element: (
      <Suspense fallback={<LoadingCircleProgress open={true} />}>
        <Layout />
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
    path: '/login',
    element: <LoginPage />,
    loader: async () => {
      if (!isLogin()) return false;
      return redirect('/');
    },
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
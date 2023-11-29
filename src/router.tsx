import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import {
  ClientSettingsPage,
  CollectionPage,
  GuestOrderDetailPage,
  GuestOrderListPage,
  GuestOrderPage,
  HomePage,
  Layout,
  LoginPage,
  MenuPage,
  NewOrderPage,
  NoCoffeechaDataPage,
  OrderPage,
  SalesManagementPage,
  UserSettingsPage,
} from '@/pages';
import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<LoadingCircleProgress open={true} />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        loader: async () => {
          const isLogin = () => {
            return localStorage.getItem('auth') !== null;
          };

          return !isLogin() && redirect('/login');
        },
        element: <Layout />,
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
          const isLogin = () => {
            return localStorage.getItem('auth') !== null;
          };

          return isLogin() && redirect('/');
        },
      },
      {
        path: '/order',
        element: <Outlet />,
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
    ],
  }
]);

export default routers;
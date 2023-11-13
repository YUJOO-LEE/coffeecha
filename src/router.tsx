import Layout from '@/components/Layout';
import CollectionPage from '@/pages/collection';
import GuestOrderDetailPage from '@/pages/guestOrder/detail';
import GuestOrderListPage from '@/pages/guestOrder/list';
import GuestOrderPage from '@/pages/guestOrder/order';
import NoCoffeechaDataPage from '@/pages/guestOrder/order/Error/NoCoffeechaDataPage';
import LoginPage from '@/pages/login';
import SalesManagementPage from '@/pages/salesManagement';
import HomePage from '@/pages/salesManagement/home';
import MenuPage from '@/pages/salesManagement/menu';
import OrderPage from '@/pages/salesManagement/order';
import { NewOrderPage } from '@/pages/salesManagement/newOrder';
import ClientSettingsPage from '@/pages/salesManagement/settings';
import UserSettingsPage from '@/pages/settings';
import React from 'react';
import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

const routers = createBrowserRouter([
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
        path: '/',
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
            path: '/:clientId',
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
    path: 'order',
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
]);

export default routers;
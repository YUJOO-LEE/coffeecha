import CollectionPage from '@/pages/collection';
import GuestOrderPage from '@/pages/guestOrder';
import SalesManagementPage from '@/pages/salesManagement';
import HomePage from '@/pages/salesManagement/home';
import LoginPage from '@/pages/login';
import MenuPage from '@/pages/salesManagement/menu';
import OrderPage from '@/pages/salesManagement/order';
import ClientSettingsPage from '@/pages/salesManagement/settings';
import UserSettingsPage from '@/pages/settings';
import { createBrowserRouter, redirect } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const isLogin = () => {
        return localStorage.getItem('auth') !== null;
      };

      return !isLogin() && redirect('/login');
    },
    children: [
      {
        path: '/',
        element: <SalesManagementPage />,
      },
      {
        path: '/collection',
        element: <CollectionPage />,
      },
      {
        path: '/settings',
        element: <UserSettingsPage />,
      },
      {
        path: '/:clientId/',
        element: <HomePage />,
      },
      {
        path: '/:clientId/order',
        element: <OrderPage />,
      },
      {
        path: '/:clientId/menu',
        element: <MenuPage />,
      },
      {
        path: '/:clientId/settings',
        element: <ClientSettingsPage />,
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
    element: <GuestOrderPage />,
    children: [
      {
        path: '/order/:clientKey',
        element: <GuestOrderPage />,
      }
    ],
  },
]);

export default routers;
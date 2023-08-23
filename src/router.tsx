import CollectionPage from '@/pages/collection';
import SalesManagementPage from '@/pages/SalesManagement';
import HomePage from '@/pages/SalesManagement/home';
import LoginPage from '@/pages/login';
import MenuPage from '@/pages/SalesManagement/menu';
import OrderPage from '@/pages/SalesManagement/order';
import SettingPage from '@/pages/SalesManagement/setting';
import { createBrowserRouter, redirect } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const isLogin = () => {
        return localStorage.getItem('auth') !== null;
      };

      return !isLogin() && redirect('/login');
    },
    children: [
      {
        path: "/",
        element: <SalesManagementPage />,
      },
      {
        path: "/collection",
        element: <CollectionPage />,
      },
      {
        path: "/:clientId/",
        element: <HomePage />,
      },
      {
        path: "/:clientId/order",
        element: <OrderPage />,
      },
      {
        path: "/:clientId/menu",
        element: <MenuPage />,
      },
      {
        path: "/:clientId/setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      const isLogin = () => {
        return localStorage.getItem('auth') !== null;
      };

      return isLogin() && redirect('/');
    },
  },
]);

export default routers;
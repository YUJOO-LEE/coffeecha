import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import MenuPage from '@/pages/menu';
import OrderPage from '@/pages/order';
import SettingPage from '@/pages/setting';
import { createBrowserRouter } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/setting",
    element: <SettingPage />,
  },
]);

export default routers;
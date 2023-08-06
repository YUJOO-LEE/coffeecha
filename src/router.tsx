import CollectionPage from '@/pages/collection';
import SalesManagementPage from '@/pages/SalesManagement';
import HomePage from '@/pages/SalesManagement/home';
import LoginPage from '@/pages/login';
import MenuPage from '@/pages/SalesManagement/menu';
import OrderPage from '@/pages/SalesManagement/order';
import SettingPage from '@/pages/SalesManagement/setting';
import { createBrowserRouter } from 'react-router-dom';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <SalesManagementPage />,
  },
  {
    path: "/collection",
    element: <CollectionPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
]);

export default routers;
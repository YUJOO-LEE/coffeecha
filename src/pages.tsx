import { lazy } from 'react';

export const Layout = lazy(() => import('@/components/Layout')
  .then(({ Layout }) => ({ default: Layout })));

export const CollectionPage = lazy(() => import('@/pages/collection')
  .then(({ CollectionPage }) => ({ default: CollectionPage })));

export const GuestOrderDetailPage = lazy(() => import('@/pages/guestOrder/detail')
  .then(({ GuestOrderDetailPage }) => ({ default: GuestOrderDetailPage })));

export const GuestOrderListPage = lazy(() => import('@/pages/guestOrder/list')
  .then(({ GuestOrderListPage }) => ({ default: GuestOrderListPage })));

export const GuestOrderPage = lazy(() => import('@/pages/guestOrder/order')
  .then(({ GuestOrderPage }) => ({ default: GuestOrderPage })));

export const NoCoffeechaDataPage = lazy(() => import('@/pages/guestOrder/order/Error/NoCoffeechaDataPage')
  .then(({ NoCoffeechaDataPage }) => ({ default: NoCoffeechaDataPage })));

export const LoginPage = lazy(() => import('@/pages/login')
  .then(({ LoginPage }) => ({ default: LoginPage })));

export const SalesManagementPage = lazy(() => import('@/pages/salesManagement')
  .then(({ SalesManagementPage }) => ({ default: SalesManagementPage })));

export const HomePage = lazy(() => import('@/pages/salesManagement/home')
  .then(({ HomePage }) => ({ default: HomePage })));

export const MenuPage = lazy(() => import('@/pages/salesManagement/menu')
  .then(({ MenuPage }) => ({ default: MenuPage })));

export const OrderPage = lazy(() => import('@/pages/salesManagement/order')
  .then(({ OrderPage }) => ({ default: OrderPage })));

export const NewOrderPage = lazy(() => import('@/pages/salesManagement/newOrder')
  .then(({ NewOrderPage }) => ({ default: NewOrderPage })));

export const ClientSettingsPage = lazy(() => import('@/pages/salesManagement/settings')
  .then(({ ClientSettingsPage }) => ({ default: ClientSettingsPage })));

export const UserSettingsPage = lazy(() => import('@/pages/settings')
  .then(({ UserSettingsPage }) => ({ default: UserSettingsPage })));
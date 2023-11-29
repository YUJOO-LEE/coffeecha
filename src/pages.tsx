import { lazy } from 'react';

export const Layout = lazy(() => import('@/components/Layout')
  .then(({ Layout }) => ({ default: Layout })));

export const GuestOrderDetailPage = lazy(() => import('@/pages/guestOrder/detail')
  .then(({ GuestOrderDetailPage }) => ({ default: GuestOrderDetailPage })));

export const GuestOrderListPage = lazy(() => import('@/pages/guestOrder/list')
  .then(({ GuestOrderListPage }) => ({ default: GuestOrderListPage })));

export const GuestOrderPage = lazy(() => import('@/pages/guestOrder/order')
  .then(({ GuestOrderPage }) => ({ default: GuestOrderPage })));
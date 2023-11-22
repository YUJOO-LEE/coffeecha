import { OrderStatus } from '@/apis/swagger/data-contracts';
import { Theme } from '@mui/material/styles/createTheme';

interface OrderStatusData {
  ko: string;
  en: string;
  color: (theme: Theme) => string;
}

export const orderStatusList: Record<OrderStatus, OrderStatusData> = {
  [OrderStatus.ORDER_PLACED]: {
    ko: '주문 접수',
    en: 'placed',
    color: (theme) => theme.palette.error.main,
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    ko: '주문 확인',
    en: 'accepted',
    color: (theme) => theme.palette.primary.main,
  },
  [OrderStatus.WAITING_FOR_PICKUP]: {
    ko: '픽업 대기',
    en: 'waiting',
    color: (theme) => theme.palette.warning.main,
  },
  [OrderStatus.PICKUP_COMPLETE]: {
    ko: '픽업 완료',
    en: 'complete',
    color: (theme) => theme.palette.success.main,
  },
  [OrderStatus.ORDER_CANCELLED]: {
    ko: '주문 취소',
    en: 'cancelled',
    color: (theme) => theme.palette.grey[400],
  },
};
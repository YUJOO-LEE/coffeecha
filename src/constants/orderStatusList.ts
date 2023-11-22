import { OrderStatus } from '@/apis/swagger/data-contracts';
import { Theme } from '@mui/material/styles/createTheme';

interface OrderStatusData {
  name: string;
  color: (theme: Theme) => string;
}

export const orderStatusList: Record<OrderStatus, OrderStatusData> = {
  [OrderStatus.ORDER_PLACED]: {
    name: '주문 접수',
    color: (theme) => theme.palette.error.main,
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    name: '주문 확인',
    color: (theme) => theme.palette.primary.main,
  },
  [OrderStatus.WAITING_FOR_PICKUP]: {
    name: '픽업 대기',
    color: (theme) => theme.palette.warning.main,
  },
  [OrderStatus.PICKUP_COMPLETE]: {
    name: '픽업 완료',
    color: (theme) => theme.palette.success.main,
  },
  [OrderStatus.ORDER_CANCELLED]: {
    name: '주문 취소',
    color: (theme) => theme.palette.grey[400],
  },
};
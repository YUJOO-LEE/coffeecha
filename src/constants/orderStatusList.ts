import { OrderStatus } from '@/apis/swagger/data-contracts';

interface OrderStatusData {
  name: string;
  color?: string;
}

export const orderStatusList: Record<OrderStatus, OrderStatusData> = {
  [OrderStatus.ORDER_PLACED]: {
    name: '주문 접수',
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    name: '주문 확인',
  },
  [OrderStatus.WAITING_FOR_PICKUP]: {
    name: '픽업 대기',
  },
  [OrderStatus.PICKUP_COMPLETE]: {
    name: '픽업 완료',
  },
  [OrderStatus.ORDER_CANCELLED]: {
    name: '주문 취소',
  },
};
import { ClientOrderResultSmsStatusEnum, OrderStatus } from '@/apis/swagger/data-contracts';
import { Theme } from '@mui/material/styles/createTheme';

interface OrderStatusData {
  ko: string;
  en: string;
  colorForAdmin: (theme: Theme) => string;
  colorForGuest: (theme: Theme) => string;
}

export const orderStatusList: Record<OrderStatus, OrderStatusData> = {
  [OrderStatus.ORDER_PLACED]: {
    ko: '주문 접수',
    en: 'placed',
    colorForAdmin: (theme) => theme.palette.error.main,
    colorForGuest: (theme) => theme.palette.primary.main,
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    ko: '주문 확인',
    en: 'accepted',
    colorForAdmin: (theme) => theme.palette.primary.main,
    colorForGuest: (theme) => theme.palette.warning.main,
  },
  [OrderStatus.WAITING_FOR_PICKUP]: {
    ko: '픽업 대기',
    en: 'waiting',
    colorForAdmin: (theme) => theme.palette.warning.main,
    colorForGuest: (theme) => theme.palette.error.main,
  },
  [OrderStatus.PICKUP_COMPLETE]: {
    ko: '픽업 완료',
    en: 'completed',
    colorForAdmin: (theme) => theme.palette.success.main,
    colorForGuest: (theme) => theme.palette.success.main,
  },
  [OrderStatus.ORDER_CANCELLED]: {
    ko: '주문 취소',
    en: 'cancelled',
    colorForAdmin: (theme) => theme.palette.grey[400],
    colorForGuest: (theme) => theme.palette.grey[400],
  },
};

export const smsStatusList: Record<ClientOrderResultSmsStatusEnum, (theme: Theme) => string> = {
  [ClientOrderResultSmsStatusEnum.BEFORE]: (theme) => theme.palette.grey[200],
  [ClientOrderResultSmsStatusEnum.SUCCESS]: (theme) => theme.palette.success.main,
  [ClientOrderResultSmsStatusEnum.BLOCK]: (theme) => theme.palette.warning.main,
  [ClientOrderResultSmsStatusEnum.FAIL]: (theme) => theme.palette.error.main,
};
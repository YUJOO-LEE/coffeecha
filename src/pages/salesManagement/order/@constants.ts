import { OrderStatus } from '@/apis/swagger/data-contracts';
import { CheckRounded, CoffeeRounded, HowToRegRounded, SvgIconComponent } from '@mui/icons-material';
import { ButtonProps } from '@mui/material/Button/Button';

export const orderActions: Record<string, Partial<ButtonProps> & { icon: SvgIconComponent, actionTarget: OrderStatus }> = {
  [OrderStatus.ORDER_PLACED]: {
    variant: 'contained',
    color: 'primary',
    icon: CheckRounded,
    actionTarget: OrderStatus.ORDER_ACCEPTED,
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    variant: 'contained',
    color: 'warning',
    icon: CoffeeRounded,
    actionTarget: OrderStatus.WAITING_FOR_PICKUP,
  },
  [OrderStatus.WAITING_FOR_PICKUP]: {
    variant: 'contained',
    color: 'success',
    icon: HowToRegRounded,
    actionTarget: OrderStatus.PICKUP_COMPLETE,
  },
};
import { useCurrentCartList } from '@/hooks/useCurrentCartList';
import { CartItem } from '@/pages/guestOrder/order/atoms';
import { CartListItem } from '@/pages/guestOrder/order/Cart/CartListItem';
import { Card, styled } from '@mui/material';
import React from 'react';

type Props = {
  clientKey: string;
  cartList: CartItem[];
  onIncrease: (index: number) => () => void;
  onDecrease: (index: number) => () => void;
  onRemove: (index: number) => () => void;
}

export const CartList = (props: Props): React.ReactNode => {
  const { clientKey, onIncrease, onDecrease, onRemove } = props;

  const cartList = useCurrentCartList(props.cartList, clientKey);

  return (
    <Styled.Wrapper>
      <Styled.List>
        {cartList.map((item, index) => (
          <CartListItem
            key={`cart-${item.menuInfo.clientMenuId}-${index}`}
            isSimple
            data={item}
            cartList={cartList}
            onIncrease={onIncrease(index)}
            onDecrease={onDecrease(index)}
            onRemove={onRemove(index)}
          />
        ))}
      </Styled.List>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Card)({
    padding: '24px',
    overflow: 'auto',
  }),
  List: styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }),
};
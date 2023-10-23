import { cartAtom } from '@/pages/guestOrder/atoms';
import { KeyboardDoubleArrowDownRounded, KeyboardDoubleArrowUpRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import CartItem from './CartItem';

export const maxWidth = 640 + 420 + 24;

const Cart = (): React.ReactNode => {

  const resizeObserver = useRef<ResizeObserver>();
  const prevScrollY = useRef<number>(window.scrollY);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [cartList, setCartList] = useAtom(cartAtom);

  const toggleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleDecrease = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      if (newList[index].quantity > 1) {
        newList[index].quantity -= 1;
        return newList;
      }
      return prev;
    });
  };

  const handleIncrease = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      newList[index].quantity += 1;
      return newList;
    });
  };

  const handleRemove = (index: number) => () => {
    setCartList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  const preventScroll = () => {
    prevScrollY.current = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${prevScrollY.current}px`;
    document.body.style.overflowY = bodyHeight > window.innerHeight ? 'scroll' : 'hidden';
  };

  const allowScroll = () => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, prevScrollY.current);
  };

  useEffect(() => {
    if (isCartOpen && document.body.offsetWidth < maxWidth) {
      preventScroll();
    } else {
      allowScroll();
    }
  }, [isCartOpen]);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { inlineSize: width } = entries[0].borderBoxSize[0];

      setIsCartOpen(width > maxWidth);
      allowScroll();
    });
    resizeObserver.current.observe(document.body);

    return () => {
      resizeObserver.current?.unobserve(document.body);
    };
  }, []);

  return (
    <>
      <Styled.Wrapper className={isCartOpen ? 'open' : 'close'}>
        <Styled.OpenButton onClick={toggleCartOpen}>
          {isCartOpen ? (
            <KeyboardDoubleArrowDownRounded sx={{ fill: 'white' }} />
          ) : (
            <KeyboardDoubleArrowUpRounded sx={{ fill: 'white' }} />
          )}
        </Styled.OpenButton>
        <Styled.Box onClick={!isCartOpen ? toggleCartOpen : undefined}>
          <Styled.Header>
            <Typography fontSize="16px" fontWeight="500">
              CART
            </Typography>
            <Box display="flex" gap="4px">
              <Typography fontSize="16px" fontWeight="500">
                Total
              </Typography>
              <Typography fontSize="16px" fontWeight="700">
                {cartList.length}
              </Typography>
            </Box>
          </Styled.Header>
          <Divider />
          <Styled.CartList>
            {!cartList.length ? (
              <Typography fontSize="16px" fontWeight="300" align="center">
                No item
              </Typography>
            ) : (
              cartList.map((item, index) => (
                <CartItem
                  key={item.menuInfo.clientMenuId}
                  data={item}
                  onIncrease={handleIncrease(index)}
                  onDecrease={handleDecrease(index)}
                  onRemove={handleRemove(index)}
                />
              ))
            )}
          </Styled.CartList>
          <Box display="flex" justifyContent="flex-end" gap="8px">
            <Button variant="text" size="medium" color="primary">
              Reset
            </Button>
            <Button variant="contained" size="medium" color="primary" disableElevation>
              Order
            </Button>
          </Box>
        </Styled.Box>
      </Styled.Wrapper>
      {isCartOpen && (
        <Styled.BackDrop onClick={toggleCartOpen} />
      )}
    </>
  );
};

export default Cart;

const Styled = {
  Wrapper: styled('div')({
    width: '100vw',
    maxWidth: '420px',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      height: '50dvh',
      maxWidth: '640px',
      padding: '0 24px',
      position: 'fixed',
      bottom: '0',
      zIndex: '1000',
      '&.open': {
        transform: 'translateY(0)',
      },
      '&.close': {
        transform: 'translateY(calc(100% - 56px))',
      },
    },
  }),
  OpenButton: styled('button')(({ theme }) => ({
    width: 'calc(100% - 48px)',
    height: '0',
    opacity: '0',
    overflow: 'hidden',
    transition: '0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    border: 'none',
    borderRadius: '4px 4px 0 0',
    backgroundColor: theme.palette.primary.main,
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      position: 'fixed',
      top: '-24px',
      zIndex: '-1',
      height: '56px',
      opacity: '1',
    },
  })),
  Box: styled('div')(({ theme }) => ({
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default,
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      height: '100%',
      borderRadius: '0',
    },
  })),
  Header: styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
  }),
  CartList: styled('ul')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      height: '100%',
      overflowY: 'auto',
    },
  }),
  BackDrop: styled('div')({
    display: 'none',
    width: '100dvw',
    height: '100dvh',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1',
    backgroundColor: 'rgba(0,0,0,0.3)',
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      display: 'block',
    },
  }),
};
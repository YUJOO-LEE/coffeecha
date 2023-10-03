import CartItem from '@/pages/guestOrder/Cart/CartItem';
import { KeyboardDoubleArrowDownRounded, KeyboardDoubleArrowUpRounded } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export const maxWidth = 640 + 420 + 24;

const Cart = (): React.ReactNode => {

  const resizeObserver = useRef<ResizeObserver>();
  const prevScrollY = useRef<number>(window.scrollY);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  const preventScroll = () => {
    prevScrollY.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${prevScrollY.current}px`;
    document.body.style.overflowY = 'scroll';
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
      const { width } = entries[0].contentRect;
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
        <Styled.Box>
          <Styled.Header>
            <Typography fontSize="16px" fontWeight="500">
              CART
            </Typography>
            <Box display="flex" gap="4px">
              <Typography fontSize="16px" fontWeight="500">
                Total
              </Typography>
              <Typography fontSize="16px" fontWeight="700">
                3
              </Typography>
            </Box>
          </Styled.Header>
          <Divider />
          <Styled.CartList>
            <Typography fontSize="16px" fontWeight="300" align="center">
              No item
            </Typography>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </Styled.CartList>
          <Box display="flex" justifyContent="flex-end" gap="8px">
            <Button variant="text" size="medium" color="primary">
              Reset
            </Button>
            <Button variant="contained" size="medium" color="primary">
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
    borderRadius: '16px 16px 0 0',
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
    borderRadius: '16px',
    backgroundColor: theme.palette.background.default,
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      height: '100%',
      borderRadius: '16px 16px 0 0',
    },
  })),
  Header: styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
  }),
  CartList: styled('ul')({
    display: 'grid',
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
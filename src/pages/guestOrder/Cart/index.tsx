import { KeyboardDoubleArrowDownRounded, KeyboardDoubleArrowUpRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const maxWidth = 640 + 420 + 24;

const Cart = (): React.ReactNode => {

  const resizeObserver = useRef<ResizeObserver>();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setIsCartOpen(width > maxWidth);
    });
    resizeObserver.current.observe(document.body);

    return () => {
      resizeObserver.current?.unobserve(document.body);
    };
  }, []);

  return (
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
          <Typography>
            CART
          </Typography>
          <Typography>
            Total 3
          </Typography>
        </Styled.Header>
      </Styled.Box>
    </Styled.Wrapper>
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
};
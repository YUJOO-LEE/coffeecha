import { MenuItem } from '@/pages/guestOrder/detail/MenuItem';
import { ProfileItem } from '@/pages/guestOrder/detail/ProfileItem';
import { styled } from '@mui/material';
import React from 'react';

export const MenuList = (): React.ReactNode => {
  return (
    <Styled.Wrapper>
      <ProfileItem title="주문수량 합계">
        10
      </ProfileItem>
      {[...Array(5)].map((_, index) => (
        <MenuItem key={index} />
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('ul')({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }),
}
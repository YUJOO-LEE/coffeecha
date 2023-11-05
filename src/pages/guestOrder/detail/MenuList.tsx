import { OrderMenuInfo } from '@/apis/swagger/data-contracts';
import { MenuItem } from '@/pages/guestOrder/detail/MenuItem';
import { ProfileItem } from '@/pages/guestOrder/detail/ProfileItem';
import { styled } from '@mui/material';
import React from 'react';

interface Props {
  data: OrderMenuInfo[];
  totalQuantity?: number;
}

export const MenuList = (props: Props): React.ReactNode => {
  const { data, totalQuantity } = props;

  return (
    <Styled.Wrapper>
      <ProfileItem title="주문수량 합계">
        {totalQuantity || 0}
      </ProfileItem>
      {data.map((item, index) => (
        <MenuItem key={`${item.menuName}-${index}`} data={item} />
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
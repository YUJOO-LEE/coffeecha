import { ProfileItem } from '@/pages/guestOrder/detail/ProfileItem';
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  orderKey: string;
}

export const GuestProfile = (props: Props): React.ReactNode => {
  const { orderKey } = props;

  return (
    <Styled.Wrapper>
      <ProfileItem title="주문번호">
        {orderKey}
      </ProfileItem>

      <ProfileItem title="주문일시">
        {dayjs().format('YYYY년 MM월 DD일, HH시 mm분 ss초')}
      </ProfileItem>

      <ProfileItem title="주문자/팀명">
        뭐게?
      </ProfileItem>

      <ProfileItem title="연락처">
        뭐게?
      </ProfileItem>

      <ProfileItem title="메세지">
        뭐게?
      </ProfileItem>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }),
};
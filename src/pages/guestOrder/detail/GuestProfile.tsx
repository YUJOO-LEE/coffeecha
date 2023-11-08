import { OrderDetailResponse } from '@/apis/swagger/data-contracts';
import { ProfileItem } from '@/pages/guestOrder/detail/ProfileItem';
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  orderKey: string;
  data?: OrderDetailResponse;
  isLoading: boolean;
}

export const GuestProfile = (props: Props): React.ReactNode => {
  const { orderKey, data, isLoading } = props;

  return (
    <Styled.Wrapper>
      <ProfileItem isLoading={isLoading} title="주문번호">
        {orderKey}
      </ProfileItem>

      <ProfileItem isLoading={isLoading} title="주문일시">
        {dayjs(data?.orderDateTime).format('YYYY년 MM월 DD일, HH시 mm분 ss초')}
      </ProfileItem>

      <ProfileItem isLoading={isLoading} title="주문자/팀명">
        {data?.guestName}
      </ProfileItem>

      <ProfileItem isLoading={isLoading} title="연락처">
        {data?.phoneNumber}
      </ProfileItem>

      {data?.message && (
        <ProfileItem isLoading={isLoading} title="메세지">
          {data?.message}
        </ProfileItem>
      )}
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
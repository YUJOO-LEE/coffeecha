import { Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  isLoading: boolean;
}

export const ProfileItem = (props: React.PropsWithChildren<Props>): React.ReactNode => {
  const { title, children, isLoading } = props;

  return (
    <Styled.Wrapper>
      <Styled.Title>
        {title}
      </Styled.Title>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          {children}
        </div>
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')({
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    alignItems: 'center',
    gap: '16px',
  }),
  Title: styled(Typography)({
    fontWeight: '700',
  }),
  Content: styled('div')({

  }),
};
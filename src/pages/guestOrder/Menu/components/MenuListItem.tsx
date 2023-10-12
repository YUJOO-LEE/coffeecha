import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const maxWidth = 420;

interface Props {
  data: ClientMenuResponse;
  onAddCart: () => void;
}

const MenuListItem = (props: Props): React.ReactNode => {
  const { data, onAddCart } = props;

  return (
    <Styled.Wrapper onClick={onAddCart}>
      <Styled.ImageWrapper>
        <img src={data.menuImageUrl} alt="title" />
      </Styled.ImageWrapper>
      <Typography fontSize="16px" fontWeight="500">
        {data.menuName}
      </Typography>
    </Styled.Wrapper>
  );
};

export default MenuListItem;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gap: '16px',
    borderRadius: '16px',
    backgroundColor: theme.palette.background.default,
    [`@media screen and (max-width: ${maxWidth}px)`]: {
      gridTemplateColumns: '56px 1fr',
      justifyItems: 'flex-start',
    },
  })),
  ImageWrapper: styled(Box)({
    width: '100%',
    aspectRatio: '1',
    overflow: 'hidden',
    borderRadius: '8px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  }),
};
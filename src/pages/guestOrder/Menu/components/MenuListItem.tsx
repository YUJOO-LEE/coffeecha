import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { DoDisturbRounded } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const maxWidth = 420;

interface Props {
  data: ClientMenuResponse;
  onAddCart: () => void;
}

const MenuListItem = (props: Props): React.ReactNode => {
  const { data, onAddCart } = props;

  const isSoldOut = data.stockQuantity <= data.saleQuantity;

  return (
    <Styled.Wrapper
      onClick={isSoldOut ? undefined : onAddCart}
      sx={{ cursor: isSoldOut ? 'default' : 'pointer'}}
    >
      <Styled.ImageWrapper>
        <img src={data.menuImageUrl} alt="title" />
      </Styled.ImageWrapper>
      <Typography fontSize="16px" fontWeight="500">
        {data.menuName}
      </Typography>

      {isSoldOut && (
        <Styled.HiddenWrapper>
          <Styled.HiddenIcon />
          <Typography fontSize="16px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
            Sold out
          </Typography>
        </Styled.HiddenWrapper>
      )}
    </Styled.Wrapper>
  );
};

export default MenuListItem;

const Styled = {
  Wrapper: styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gap: '16px',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
    cursor: 'pointer',
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
  HiddenWrapper: styled('div')({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0,0,0,0.15)',
  }),
  HiddenIcon: styled(DoDisturbRounded)(({ theme }) => ({
    '& path': {
      fill: theme.palette.primary.main,
    },
  })),
};
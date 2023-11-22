import { MenuResponse } from '@/apis/swagger/data-contracts';
import { Box, Card, styled, Typography } from '@mui/material';
import React from 'react';

interface Props {
  isSimple?: boolean;
  data: MenuResponse;
  renderActionComponent?: React.ReactNode;
  onClick?: () => void;
}

const CollectionGridItem = (props: Props): React.ReactNode => {
  const { isSimple, data, renderActionComponent, onClick } = props;

  return (
    <Styled.CollectionItem className={onClick ? 'isButton' : undefined} onClick={onClick}>
      {renderActionComponent}
      {data.imageUrl ? (
        <Styled.ImageBox>
          <img src={data.imageUrl} alt={data.menuName} />
        </Styled.ImageBox>
      ) : (
        <Styled.ImageBox>
          <Typography fontSize="14px" fontWeight="700" color={(theme) => theme.palette.background.default}>
            No image
          </Typography>
        </Styled.ImageBox>
      )}
      <Typography fontSize="14px" fontWeight="500">
        {data.menuName}
      </Typography>
      {!isSimple && (
        <Typography fontSize="12px" color="grey">
          {data.description}
        </Typography>
      )}
    </Styled.CollectionItem>
  );
};

export default CollectionGridItem;

const Styled = {
  CollectionItem: styled(Card)({
    position: 'relative',
    padding: '16px',
    display: 'grid',
    gap: '16px',
    '&.isButton': {
      cursor: 'pointer',
    },
  }),
  ImageBox: styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  })),
};
import { MenuResponse } from '@/apis/swagger/data-contracts';
import { Box, Card, styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  data: MenuResponse;
  renderActionComponent?: React.ReactNode;
}

const CollectionGridItem = (props: IProps): React.ReactNode => {
  const { data, renderActionComponent } = props;

  return (
    <Styled.CollectionItem>
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
      <Typography fontSize="12px" color="grey">
        {data.description}
      </Typography>
    </Styled.CollectionItem>
  );
};

export default CollectionGridItem;

const Styled = {
  CollectionItem: styled(Card)({
    padding: '16px',
    display: 'grid',
    gap: '16px',
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
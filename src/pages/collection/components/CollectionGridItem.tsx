import { UserMenuResponse } from '@/apis/swagger/data-contracts';
import { CancelRounded, ModeEditOutlineRounded } from '@mui/icons-material';
import { Box, Card, IconButton, styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  data: UserMenuResponse;
  onChange: () => void;
  onDelete: () => void;
}

const MenuGridItem = (props: IProps): React.ReactNode => {
  const { onChange, onDelete, data } = props;

  return (
    <Styled.CollectionItem>
      <Box display="flex" gap="8px" justifyContent="flex-end" alignItems="center">
        <IconButton size="large" sx={{ margin: '-10px' }} onClick={onDelete}>
          <CancelRounded sx={{ width: '16px', height: '16px' }} />
        </IconButton>
        <IconButton size="large" sx={{ margin: '-10px' }} onClick={onChange}>
          <ModeEditOutlineRounded sx={{ width: '16px', height: '16px' }} />
        </IconButton>
      </Box>
      {data.imageUrl ? (
        <Styled.ImageBox>
          <img src={data.imageUrl} alt={data.userMenuName} />
        </Styled.ImageBox>
      ) : (
        <Styled.ImageBox>
          <Typography fontSize="14px" fontWeight="700" color={(theme) => theme.palette.background.default}>
            No image
          </Typography>
        </Styled.ImageBox>
      )}
      <Typography fontSize="14px" fontWeight="500">
        {data.userMenuName}
      </Typography>
      <Typography fontSize="12px" color="grey">
        {data.description}
      </Typography>
    </Styled.CollectionItem>
  );
};

export default MenuGridItem;

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
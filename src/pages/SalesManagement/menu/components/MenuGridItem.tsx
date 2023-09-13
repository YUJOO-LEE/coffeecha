import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { CancelRounded, CheckCircleRounded, DeleteOutlineRounded, ModeEditOutlineRounded } from '@mui/icons-material';
import { Box, Card, IconButton, Skeleton, styled, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  isEditMode?: boolean;
  data?: ClientMenuResponse;
}

const MenuGridItem = (props: IProps): React.ReactNode => {
  const { data } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditModeOn = () => {
    setEditMode(true);
  };

  const handleEditModeOff = () => {
    setEditMode(false);
  };

  return (
    <Styled.MenuItem>
      <Box display="flex" gap="8px" justifyContent="flex-end" alignItems="center">
        {editMode ? (
          <Box display="flex" gap="8px" alignItems="center">
            <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleEditModeOff}>
              <CancelRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
            <IconButton size="large" color="success" sx={{ margin: '-10px' }} onClick={handleEditModeOff}>
              <CheckCircleRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" gap="8px" alignItems="center">
            <IconButton size="large" sx={{ margin: '-10px' }}>
              <DeleteOutlineRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
            <IconButton size="large" color="primary" sx={{ margin: '-10px' }} onClick={handleEditModeOn}>
              <ModeEditOutlineRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {data ? data.menuImageUrl && (
        <img src={data.menuImageUrl} alt={data.menuName} />
      ) : (
        <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} />
      )}
      <Typography>
        {data?.menuName}
      </Typography>
      <Typography>
        Menu 1
      </Typography>
    </Styled.MenuItem>
  );
};

export default MenuGridItem;

const Styled = {
  MenuItem: styled(Card)({
    padding: '16px',
    display: 'grid',
    gap: '16px',
  }),
};
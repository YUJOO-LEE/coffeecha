import { ModeEditOutlineRounded } from '@mui/icons-material';
import { Box, Card, Checkbox, IconButton, Skeleton, styled, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  isEditMode?: boolean;
  onChange: () => void;
  data?: any; //TODO: client menu response
}

const MenuGridItem = (props: IProps): React.ReactNode => {
  const { isEditMode, onChange, data } = props;

  return (
    <Styled.MenuItem>
      <Box display="flex" gap="16px" justifyContent="space-between" alignItems="center">
        <Checkbox sx={{ margin: '-10px' }} disabled={!isEditMode} />
        <IconButton size="large" sx={{ margin: '-10px' }} onClick={onChange}>
          <ModeEditOutlineRounded sx={{ width: '16px', height: '16px' }} />
        </IconButton>
      </Box>
      <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }} />
      <Typography>
        Menu 1
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
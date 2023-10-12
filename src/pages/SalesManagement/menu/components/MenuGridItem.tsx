import { useDeleteClientMenu } from '@/apis/queries/salesManagement/menu';
import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import MenuInfoTooltip from '@/pages/SalesManagement/menu/components/MenuInfoTooltip';
import {
  CancelRounded,
  CheckCircleRounded,
  DeleteOutlineRounded,
  InfoRounded,
  ModeEditOutlineRounded,
} from '@mui/icons-material';
import { Box, Card, IconButton, Skeleton, styled, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  data?: ClientMenuResponse;
}

const MenuGridItem = (props: Props): React.ReactNode => {
  const { data } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const deleteMenu = useDeleteClientMenu();

  const isTooltipShow: boolean = Boolean(data?.menuDescription || (data?.optionNames && data.optionNames.length > 0));

  const handleEditModeOn = () => {
    setEditMode(true);
  };

  const handleEditModeOff = () => {
    setEditMode(false);
  };

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleEdit = async () => {
    // TODO: call api
  };

  const handleDelete = async () => {
    if (!data) return;

    const { status } = await deleteMenu.mutateAsync({ clientMenuId: data?.clientMenuId });
    if (status === 200) {
      handleDeleteClose();
    }
  };

  return (
    <Styled.MenuItem>
      <Box display="flex" gap="8px" justifyContent={isTooltipShow ? 'space-between' : 'flex-end'} alignItems="center">
        {isTooltipShow && (
          <Tooltip title={<MenuInfoTooltip data={data} />} arrow>
            <IconButton size="large" sx={{ margin: '-10px', cursor: 'auto' }}>
              <InfoRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
          </Tooltip>
        )}
        {editMode ? (
          <Box display="flex" gap="8px" alignItems="center">
            <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleEditModeOff}>
              <CancelRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
            <IconButton size="large" color="success" sx={{ margin: '-10px' }} onClick={handleEdit}>
              <CheckCircleRounded sx={{ width: '16px', height: '16px' }} />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" gap="8px" alignItems="center">
            <IconButton size="large" sx={{ margin: '-10px' }} onClick={handleDeleteOpen}>
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
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="8px">
        <Styled.Quantity
          disabled
          label="sold"
          inputMode="numeric"
          type="number"
          size="small"
          value={data?.saleQuantity}
        />
        <Styled.Quantity
          disabled={!editMode}
          label="in stock"
          inputMode="numeric"
          type="number"
          size="small"
          value={data?.stockQuantity}
        />
      </Box>
      {isDeleteOpen && (
        <DeleteDialog onClose={handleDeleteClose} onDone={handleDelete} />
      )}
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
  Quantity: styled(TextField)({
    '& input': {
      paddingRight: '8px',
    },
  }),
};
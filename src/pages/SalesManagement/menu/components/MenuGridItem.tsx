import { useDeleteClientMenu, useUpdateClientMenuStockQuantity } from '@/apis/queries/salesManagement/menu';
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
import { Box, Card, IconButton, styled, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  data: ClientMenuResponse;
}

const MenuGridItem = (props: Props): React.ReactNode => {
  const { data } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [stockQuantity, setStockQuantity] = useState<number>(data.stockQuantity);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const updateStockQuantity = useUpdateClientMenuStockQuantity(data.clientMenuId);
  const deleteMenu = useDeleteClientMenu(data.clientMenuId);

  const isTooltipShow: boolean = Boolean(data.menuDescription || (data.optionNames && data.optionNames.length > 0));

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

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStockQuantity(Number(event.target.value));
  };

  const handleEdit = async () => {
    const { status } = await updateStockQuantity.mutateAsync({ stockQuantity });
    if (status === 200) {
      handleEditModeOff();
    }
  };

  const handleDelete = async () => {
    const { status } = await deleteMenu.mutateAsync();
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
        {!data.menuHidden && (editMode ? (
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
        ))}
      </Box>
      <Box display="grid" gap="16px">
        <Styled.ImageWrapper>
          <img
            src={data.menuImageUrl}
            alt={data.menuName}
            style={{ filter: data.menuHidden ? 'blur(5px)' : undefined }}
          />
        </Styled.ImageWrapper>
        <Typography>
          {data.menuName}
        </Typography>
      </Box>
      {data.menuHidden ? (
        <Typography fontSize="12px" color={(theme) => theme.palette.error.main}>
          Menu removed from collection
        </Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="8px">
          <Styled.Quantity
            disabled
            label="sold"
            inputMode="numeric"
            type="number"
            size="small"
            value={data.saleQuantity}
          />
          <Styled.Quantity
            disabled={!editMode}
            label="in stock"
            inputMode="numeric"
            type="number"
            size="small"
            value={stockQuantity.toString()}
            error={!stockQuantity}
            onChange={handleQuantity}
          />
        </Box>
      )}
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
    gridTemplateRows: 'auto auto 1fr',
    gap: '16px',
  }),
  ImageWrapper: styled(Box)({
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '8px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  }),
  Quantity: styled(TextField)({
    '& input': {
      paddingRight: '8px',
    },
  }),
};
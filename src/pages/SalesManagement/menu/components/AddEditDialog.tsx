import { useGetCollectionList } from '@/apis/queries/collection';
import { useAddClientMenu } from '@/apis/queries/salesManagement/menu';
import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import CollectionGridItem from '@/pages/collection/components/CollectionGridItem';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IProps {
  clientId: number;
  editData?: ClientMenuResponse;
  onClose: () => void;
}

const AddEditDialog = (props: IProps): React.ReactNode => {
  const { clientId, editData, onClose } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedIdList, setSelectedIdList] = useState<number[]>([]);

  const { data: collectionList } = useGetCollectionList();
  const addMenu = useAddClientMenu();

  const isCheckedAll = selectedIdList.length === collectionList?.length;
  const isIndeterminate = !!(collectionList && selectedIdList.length) && selectedIdList.length < collectionList.length;

  const handleSelectAll = () => {
    if (!collectionList) return;
    const allIds = collectionList.map(({ menuId }) => menuId);
    setSelectedIdList((isCheckedAll || isIndeterminate) ? [] : allIds);
  };

  const handleSelect = (id: number) => () => {
    setSelectedIdList((prev) => {
      const founded = prev.find((prevId) => prevId === id);
      if (founded) {
        return prev.filter((list) => list !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAdd = async () => {
    setIsDisabled(true);
    const { status } = await addMenu.mutateAsync({
      clientId,
      data: { menuIds: selectedIdList }
    });

    if (status === 200) {
      onClose();
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!selectedIdList.length);
  }, [selectedIdList]);

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <DialogTitle display="flex" justifyContent="space-between">
        {editData ? 'Edit' : 'Add New'} Menu
      </DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Styled.CheckAllLabel>
            <Checkbox
              checked={isCheckedAll}
              indeterminate={isIndeterminate}
              size="medium"
              onClick={handleSelectAll}
              disabled={!collectionList}
            />
            <Typography fontSize="14px" fontWeight="500">
              Select All
            </Typography>
          </Styled.CheckAllLabel>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="16px" paddingTop="4px">
          {collectionList?.map((item) => (
            <CollectionGridItem
              isSimple
              key={item.menuId}
              data={item}
              renderActionComponent={(
                <Styled.ActionWrapper>
                  <Checkbox checked={selectedIdList.includes(item.menuId)} size="medium" />
                </Styled.ActionWrapper>
              )}
              onClick={handleSelect(item.menuId)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="large" disabled={isDisabled} onClick={handleAdd}>
          {editData ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditDialog;

const Styled = {
  ActionWrapper: styled(Box)({
    margin: '-12px',
  }),
  CheckAllLabel: styled('label')({
    display: 'flex',
    alignItems: 'center',
  }),
}
import { useAddOption, useDeleteOption, useGetOptionList } from '@/apis/queries/menuOption';
import { MenuOptionResponse } from '@/apis/swagger/data-contracts';
import DeleteDialog from '@/components/DeleteDialog';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import OptionListItem from '@/pages/collection/components/OptionListItem';
import { AddRounded, CheckRounded, ClearRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  onClose: () => void;
}

const OptionDialog = (props: IProps): React.ReactNode => {
  const { onClose } = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<MenuOptionResponse>();
  const [optionName, setOptionName] = useState<string>('');

  const { data: optionList } = useGetOptionList();
  const addOption = useAddOption();
  const deleteOption = useDeleteOption();

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionName(e.target.value);
  };

  const handleAddSubmit = async () => {
    await addOption.mutateAsync({ name: optionName });
    setIsEditMode(false);
    setOptionName('');
  };

  const handleDeleteOpen = (item: MenuOptionResponse) => () => {
    setDeleteTarget(item);
  };

  const handleDeleteClose = () => {
    setDeleteTarget(undefined);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.menuOptionId) return;

    await deleteOption.mutateAsync({ menuOptionId: deleteTarget.menuOptionId });
    handleDeleteClose();
  };

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '30%', minWidth: '380px' } }}>
      <LoadingCircleProgress open={addOption.isLoading} />
      <DialogTitle display="flex" justifyContent="space-between">
        Option Settings
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box display="flex" justifyContent="flex-end" gap="4px">
            {isEditMode ? (
              <>
                <Styled.TextField
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  className={isEditMode ? undefined : 'readOnly'}
                  InputProps={{ readOnly: !isEditMode }}
                />
                <Styled.Button variant="outlined" size="small" color="success" onClick={handleAddSubmit}>
                  <CheckRounded />
                </Styled.Button>
                <Styled.Button variant="outlined" size="small" onClick={toggleEditMode}>
                  <ClearRounded />
                </Styled.Button>
              </>
            ) : (
              <Styled.Button variant="contained" size="medium" startIcon={<AddRounded />} onClick={toggleEditMode}>
                New Option
              </Styled.Button>
            )}
          </Box>

          {optionList?.map((item) =>
            <OptionListItem key={item.menuOptionId} data={item} onDelete={handleDeleteOpen(item)} />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 16px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Close
        </Button>
      </DialogActions>

      {deleteTarget && (
        <DeleteDialog onDone={handleDelete} onClose={handleDeleteClose} />
      )}
    </Dialog>
  );
};

export default OptionDialog;

const Styled = {
  TextField: styled(TextField)({
    flex: '1',
  }),
  Button: styled(Button)({
    minWidth: '40px',
    minHeight: '40px',
  }),
};
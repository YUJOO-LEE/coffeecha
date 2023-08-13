import { useAddCollection, useGetCategoryList, useUpdateCollection } from '@/apis/queries/collection';
import { CreateUserMenuRequest, UserMenuResponse } from '@/apis/swagger/data-contracts';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
  editData?: UserMenuResponse;
  onClose: () => void;
}

const AddEditDialog = (props: IProps): React.ReactNode => {
  const { editData, onClose } = props;

  const [formData, setFormData] = useState<Omit<CreateUserMenuRequest, 'userId'>>({ name: '', imageUrl: '', description: '', categoryId: 0 });
  const isDisabled = !formData.name || !formData.categoryId;

  const { data: categoryList } = useGetCategoryList();
  const { mutateAsync: addMutateAsync } = useAddCollection();
  const { mutateAsync: updateMutateAsync } = useUpdateCollection();

  const handleChange = (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
    }))
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: Number(e.target.value),
    }))
  };

  const handleSave = async () => {
    const { status } = editData
      ? await updateMutateAsync({ menuId: editData.userMenuId, data: formData })
      : await addMutateAsync(formData);

    if (status === 200) {
      onClose();
    }
  };

  useLayoutEffect(() => {
    if (!editData) return;

    setFormData({
      name: editData.userMenuName,
      description: editData.description,
      imageUrl: editData.imageUrl,
      categoryId: editData.categoryId,
    });
  }, [editData]);

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <DialogTitle display="flex" justifyContent="space-between">
        {editData ? 'Edit' : 'Add New'} Menu
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="4px">
          <Select variant="outlined" value={formData.categoryId} onChange={handleCategoryChange}>
            {categoryList?.map(({ id, name }) => (
              <MenuItem key={`${name}_${id}`} value={id} >{name}</MenuItem>
            ))}
          </Select>
          <TextField type="file" label="Image" variant="outlined" />
          <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} />
          <TextField label="Description" variant="outlined" value={formData.description} onChange={handleChange('description')} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="large" disabled={isDisabled} onClick={handleSave}>
          {editData ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditDialog;
import { useAddCollection, useGetCategoryList, useUpdateCollection } from '@/apis/queries/collection';
import { useGetOptionList } from '@/apis/queries/menuOption';
import { CreateMenuRequest, MenuResponse } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import OptionDialog from '@/pages/collection/components/OptionDialog';
import { ManageSearchRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
  editData?: MenuResponse;
  onClose: () => void;
}

const AddEditDialog = (props: IProps): React.ReactNode => {
  const { editData, onClose } = props;

  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<CreateMenuRequest, 'userId'>>({ name: '', imageUrl: '', description: '', categoryId: 0, menuOptionIds: [] });
  const isDisabled = !formData.name || !formData.categoryId;

  const { data: categoryList } = useGetCategoryList();
  const { data: optionList } = useGetOptionList();
  const addCollection = useAddCollection();
  const updateCollection = useUpdateCollection();

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

  const handleOptionChange = (e: SelectChangeEvent<number[]>) => {
    setFormData((prev) => ({
      ...prev,
      menuOptionIds: e.target.value as number[],
    }))
  };

  const handleSave = async () => {
    const { status } = editData
      ? await updateCollection.mutateAsync({ menuId: editData.menuId, data: formData })
      : await addCollection.mutateAsync(formData);

    if (status === 200) {
      onClose();
    }
  };

  const toggleOptionPanel = () => {
    setIsOptionOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (!editData) return;

    setFormData({
      name: editData.menuName,
      description: editData.description,
      imageUrl: editData.imageUrl,
      categoryId: editData.categoryId,
      menuOptionIds: editData.menuOptionIds,
    });
  }, [editData]);

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <LoadingCircleProgress open={addCollection.isLoading || updateCollection.isLoading} />

      <DialogTitle display="flex" justifyContent="space-between">
        {editData ? 'Edit' : 'Add New'} Menu
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="5px">
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category" variant="outlined" value={formData.categoryId} onChange={handleCategoryChange}>
              {categoryList?.map(({ id, name }) => (
                <MenuItem key={`${name}_${id}`} value={id} >{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField type="file" label="Image" variant="outlined" />
          <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} />

          <Box display="flex" gap="4px">
            <FormControl fullWidth>
              <InputLabel id="options-label">Options</InputLabel>
              <Select labelId="options-label" label="Options" multiple variant="outlined" value={formData.menuOptionIds} onChange={handleOptionChange}>
                {optionList?.map(({ menuOptionId, menuOptionName }) => (
                  <MenuItem key={`${menuOptionName}_${menuOptionId}`} value={menuOptionId} >{menuOptionName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" size="large" onClick={toggleOptionPanel}>
              <ManageSearchRounded />
            </Button>
          </Box>
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

      {isOptionOpen && <OptionDialog onClose={toggleOptionPanel} />}
    </Dialog>
  );
}

export default AddEditDialog;
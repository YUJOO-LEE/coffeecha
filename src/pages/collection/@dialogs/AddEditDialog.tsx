import { useAddCollection, useGetCategoryList, useImageUpload, useUpdateCollection } from '@/apis/queries/collection';
import { useGetOptionList } from '@/apis/queries/menuOption';
import { CreateMenuRequest, MenuResponse } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import OptionDialog from '@/pages/collection/@dialogs/OptionDialog';
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
  styled,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  editData?: MenuResponse;
  onClose: () => void;
}

const AddEditDialog = (props: Props): React.ReactNode => {
  const { editData, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const fileRef = useRef<HTMLInputElement>(null);

  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<CreateMenuRequest, 'userId'>>({ name: '', imageUrl: '', description: '', categoryId: 0, menuOptionIds: [] });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { data: categoryList } = useGetCategoryList();
  const { data: optionList } = useGetOptionList();
  const addCollection = useAddCollection();
  const updateCollection = useUpdateCollection();
  const uploadImage = useImageUpload();

  const handleChange = (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: Number(e.target.value),
    }));
  };

  const handleOptionChange = (e: SelectChangeEvent<number[]>) => {
    setFormData((prev) => ({
      ...prev,
      menuOptionIds: e.target.value as number[],
    }));
  };

  const handleUploadClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({...prev, imageUrl: '' }));
      return;
    }

    if (!file.type.includes('image/')) {
      enqueueSnackbar('This file type is not supported', { variant: 'error' });
      e.target.value = '';
      return;
    }

    const { data } = await uploadImage.mutateAsync({ file: file.name });
    if (data.uploadUrl) {
      const imageUrl = data.uploadUrl.split('?')[0];
      const { status } = await axios.put(data.uploadUrl, file);

      if (status === 200) {
        setFormData((prev) => ({...prev, imageUrl }));
      }
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setIsDisabled(true);

    const { status } = editData
      ? await updateCollection.mutateAsync({ menuId: editData.menuId, data: formData })
      : await addCollection.mutateAsync(formData);

    if (status === 200) {
      onClose();
    } else {
      setIsDisabled(false);
    }
  };

  const toggleOptionPanel = () => {
    setIsOptionOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsDisabled(!formData.name || !formData.categoryId);
  }, [formData]);

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
          {formData.imageUrl ? (
            <Styled.ImagePreview>
              <img src={formData.imageUrl} alt={formData.imageUrl} />
              <Styled.ChangeImageButton variant="contained" disableElevation onClick={handleUploadClick}>
                Change Image
              </Styled.ChangeImageButton>
            </Styled.ImagePreview>
          ) : (
            <Button variant="contained" size="large" disableElevation onClick={handleUploadClick}>
              Upload Image
            </Button>
          )}
          <Styled.ImageInput ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />

          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category" variant="outlined" value={formData.categoryId} onChange={handleCategoryChange}>
              {categoryList?.map(({ id, name }) => (
                <MenuItem key={`${name}_${id}`} value={id} >{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} />

          <Box display="flex" gap="4px">
            <FormControl fullWidth>
              <InputLabel id="options-label">Options</InputLabel>
              <Select labelId="options-label" label="Options" multiple variant="outlined" value={formData.menuOptionIds || ''} onChange={handleOptionChange}>
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
        <Button variant="contained" size="large" disabled={isDisabled} disableElevation onClick={handleSave}>
          {editData ? 'Save' : 'Add'}
        </Button>
      </DialogActions>

      {isOptionOpen && <OptionDialog onClose={toggleOptionPanel} />}
    </Dialog>
  );
}

export default AddEditDialog;

const Styled = {
  ImagePreview: styled('div')(({ theme }) => ({
    position: 'relative',
    height: '180px',
    padding: '8px',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: '4px',
    lineHeight: '0',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  })),
  ChangeImageButton: styled(Button)({
    position: 'absolute',
    top: '16px',
    right: '16px',
  }),
  ImageInput: styled('input')({
    display: 'none',
  }),
};
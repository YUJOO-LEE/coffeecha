import { useUpdateOption } from '@/apis/queries/menuOption';
import { MenuOptionResponse } from '@/apis/swagger/data-contracts';
import IconButton from '@/components/IconButton';
import { CheckRounded, ClearRounded, DeleteOutlineRounded, ModeEditOutlineRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  data: MenuOptionResponse;
  onDelete: () => void;
}

const OptionListItem = (props: IProps): React.ReactNode => {
  const { data, onDelete } = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [optionName, setOptionName] = useState<string>('');

  const updateOption = useUpdateOption();

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionName(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (!data.menuOptionId) return;

    await updateOption.mutateAsync({ menuOptionId: data.menuOptionId, data: { name: optionName } });
    setIsEditMode(false);
    setOptionName('');
  };

  return (
    <Box display="flex" gap="4px">
      <Styled.TextField
        variant="outlined"
        size="small"
        defaultValue={data.menuOptionName}
        onChange={handleChange}
        className={isEditMode ? undefined : 'readOnly'}
        InputProps={{ readOnly: !isEditMode }}
      />

      {isEditMode ? (
        <>
          <Styled.Button variant="outlined" size="small" color="success" onClick={handleEditSubmit}>
            <CheckRounded />
          </Styled.Button>
          <Styled.Button variant="outlined" size="small" onClick={toggleEditMode}>
            <ClearRounded />
          </Styled.Button>
        </>
      ) : (
        <>
          <IconButton color="primary" onClick={onDelete}>
            <DeleteOutlineRounded />
          </IconButton>
          <IconButton color="primary" onClick={toggleEditMode}>
            <ModeEditOutlineRounded />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default OptionListItem;

const Styled = {
  TextField: styled(TextField)({
    flex: '1',
    '&.readOnly': {
      '& .MuiInput-underline:after': {
        borderColor: 'transparent',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent',
        },
        '&:hover fieldset': {
          borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-input': {
          paddingLeft: '0',
        },
      },
    },
  }),
  Button: styled(Button)({
    minWidth: '40px',
  }),
};
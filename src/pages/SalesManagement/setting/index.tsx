import { useDeleteClient } from '@/apis/queries/client';
import DeleteDialog from '@/components/DeleteDialog';
import Layout from '@/components/Layout';
import { SettingsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SettingPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteMutateAsync, isSuccess: isDeleteSuccess } = useDeleteClient();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = async () => {
    await deleteMutateAsync(Number(clientId));
  };

  useEffect(() => {
    if (!isDeleteSuccess) return;

    navigate('/');
    handleDeleteClose();
  }, [isDeleteSuccess, navigate]);

  return (
    <Layout>
      <Box display="grid" gap="16px">
        <Box display="flex" gap="8px">
          <SettingsRounded color="primary" />
          <Typography variant="h1" fontSize="20px" fontWeight="500" color={(theme) => theme.palette.primary.main}>
            Setting
          </Typography>
        </Box>
        <Styled.ContentBox display="flex" flexDirection="column" gap="16px">
          <TextField label="Name" variant="outlined" disabled={!editMode} />
          <TextField label="Contact" variant="outlined" disabled={!editMode} />
          <TextField label="Address" variant="outlined" disabled={!editMode} />
          <DatePicker label="Business date" disabled={!editMode} />
          <Box display="flex" justifyContent="flex-end" gap="8px">
            {editMode ? (
              <>
                <Button variant="outlined" size="large" onClick={toggleEditMode}>
                  Cancel
                </Button>
                <Button variant="contained" size="large">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="error" size="large" onClick={handleDeleteOpen}>
                  Delete
                </Button>
                <Button variant="contained" size="large" onClick={toggleEditMode}>
                  Edit
                </Button>
              </>
            )}
          </Box>
        </Styled.ContentBox>
      </Box>

      {isDeleteOpen && (<DeleteDialog onClose={handleDeleteClose} onDone={handleDelete} />)}
    </Layout>
  );
}

export default SettingPage;

const Styled = {
  ContentBox: styled(Box)(({ theme }) => ({
    padding: '24px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
  })),
};
import Layout from '@/component/Layout';
import { SettingsRounded } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const SettingPage = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

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
              <Button variant="contained" size="large" onClick={toggleEditMode}>
                Edit
              </Button>
            )}
          </Box>
        </Styled.ContentBox>
      </Box>
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
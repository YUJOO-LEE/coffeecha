import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface IProps {
  editData?: unknown; // TODO
  onClose: () => void;
}

const AddEditDialog = (props: IProps): React.ReactNode => {
  const { editData, onClose } = props;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <DialogTitle display="flex" justifyContent="space-between">
        {editData ? 'Edit' : 'Add New'} Menu
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="4px">
          <TextField type="file" label="Image" variant="outlined" />
          <TextField label="Name" variant="outlined" />
          <TextField label="Description" variant="outlined" />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="large">
          {editData ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditDialog;
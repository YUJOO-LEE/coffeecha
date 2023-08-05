import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

interface IProps {
  onClose: () => void;
}

const CustomerAddDialog = (props: IProps): React.ReactNode => {
  const { onClose } = props;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '50%', minWidth: '440px' } }}>
      <DialogTitle display="flex" justifyContent="space-between">
        Add New Customer
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="4px">
          <TextField label="Name" variant="outlined" />
          <TextField label="Contact" variant="outlined" />
          <TextField label="Address" variant="outlined" />
          <DatePicker label="Business date" />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="large">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerAddDialog;
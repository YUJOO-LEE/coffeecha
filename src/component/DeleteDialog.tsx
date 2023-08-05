import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  onClose: () => void;
}

const DeleteDialog = (props: IProps): React.ReactNode => {
  const { onClose } = props;

  return (
    <Dialog open={true} onClick={onClose} PaperProps={{ style: { minWidth: '360px' } }}>
      <DialogContent>
        <Typography>
          Are you sure you want to delete?
        </Typography>
        <Typography>
          This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" color="error">
          Delete
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
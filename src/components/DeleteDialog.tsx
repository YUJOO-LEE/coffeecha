import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  onClose: () => void;
  onDone: () => void;
}

const DeleteDialog = (props: IProps): React.ReactNode => {
  const { onClose, onDone } = props;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { minWidth: '360px' } }}>
      <DialogContent>
        <Typography>
          Are you sure you want to delete?
        </Typography>
        <Typography>
          This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" color="error" disableElevation onClick={onDone}>
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
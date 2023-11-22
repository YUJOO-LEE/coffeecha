import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

type Props = {
  onClose: () => void;
  onDone: () => void;
}

export const CancelDialog = (props: Props): React.ReactNode => {
  const { onClose, onDone } = props;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { minWidth: '400px' } }}>
      <DialogContent>
        <Typography>
          Are you sure you want to cancel this order?
        </Typography>
        <Typography>
          This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" color="error" disableElevation onClick={onDone}>
          Cancel
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
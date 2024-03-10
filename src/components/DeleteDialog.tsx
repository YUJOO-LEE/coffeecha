import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

interface Props {
  onClose: () => void;
  onDone: () => void;
}

const DeleteDialog = (props: Props): React.ReactNode => {
  const { onClose, onDone } = props;

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { minWidth: '360px' } }}>
      <DialogContent>
        <Typography>
          삭제하시겠습니까?
        </Typography>
        <Typography>
          삭제된 데이터는 복구할 수 없습니다.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" color="error" disableElevation onClick={onDone}>
          삭제
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
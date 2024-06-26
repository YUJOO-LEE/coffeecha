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
          주문을 취소하시겠습니까?
        </Typography>
        <Typography>
          변경된 상태는 되돌릴 수 없습니다.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" color="error" disableElevation onClick={onDone}>
          주문 취소
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
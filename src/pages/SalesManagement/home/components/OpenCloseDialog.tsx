import { Box, Button, Dialog, DialogActions, DialogContent, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface IProps {
  changeToOpen: boolean;
  openingDate: string;
  onClose: () => void;
  onDone: () => void;
}

const OpenCloseDialog = (props: IProps): React.ReactNode => {
  const { onClose, onDone, changeToOpen, openingDate } = props;

  const isDisabled: boolean = !!dayjs(openingDate).diff(new Date());

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { maxWidth: '460px' } }}>
      <DialogContent>
        <Box display="grid" gap="16px">
          <Styled.Content>
            Are you sure you want to change the status to <span>{changeToOpen ? 'Open' : 'Close'}?</span>
          </Styled.Content>
          {isDisabled && (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                Status cannot be updated due to a mismatch with the provided <span>opening date ({dayjs(openingDate).format('MMM d, YYYY')})</span>
              </Styled.Content>
            </Styled.ErrorBox>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="contained" size="large" onClick={onDone} disabled={isDisabled}>
          Confirm
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OpenCloseDialog;

const Styled = {
  Content: styled(Typography)({
    '& span': {
      fontWeight: '700',
    },
  }),
  ErrorBox: styled(Box)(({ theme }) => ({
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: theme.palette.grey[200],
  })),
};
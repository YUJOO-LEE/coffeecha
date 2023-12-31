import { useCloseClient, useOpenClient } from '@/apis/queries/client';
import { ClientResponse, OpenStatus } from '@/apis/swagger/data-contracts';
import { Box, Button, Dialog, DialogActions, DialogContent, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface Props {
  data: ClientResponse;
  onClose: () => void;
}

const OpenCloseDialog = (props: Props): React.ReactNode => {
  const { onClose, data } = props;
  const changeToOpen: boolean = data.openStatus !== OpenStatus.OPEN;
  const isSameDate = dayjs().isSame(dayjs(data.businessDate), 'd');

  const [isDisabled, setIsDisabled] = useState<boolean>(!isSameDate);

  const openClient = useOpenClient();
  const closeClient = useCloseClient();

  const handleChangeStatus = async () => {
    setIsDisabled(true);

    const mutation = {
      [OpenStatus.CLOSE]: openClient,
      [OpenStatus.OPEN]: closeClient,
    };

    try {
      await mutation[data.openStatus].mutateAsync(data.clientId);
      onClose();
    } catch (e) {
      setIsDisabled(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { maxWidth: '460px' } }}>
      <DialogContent>
        <Box display="grid" gap="16px">
          <Styled.Content>
            Are you sure you want to change the status to <span>{changeToOpen ? 'Open' : 'Close'}?</span>
          </Styled.Content>
          {!isSameDate ? (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                Status cannot be updated due to a mismatch with the provided <span>opening date ({dayjs(data.businessDate).format('MMM d, YYYY')})</span>
              </Styled.Content>
            </Styled.ErrorBox>
          ) : changeToOpen && (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                Changing the current client's status to <span>Open</span> will automatically switch the status of the currently open client to <span>Closed</span>.
              </Styled.Content>
            </Styled.ErrorBox>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          disableElevation
          variant="contained"
          size="large"
          onClick={handleChangeStatus}
          disabled={changeToOpen && isDisabled}
        >
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
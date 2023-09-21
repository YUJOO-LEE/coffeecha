import { useCloseClient, useOpenClient } from '@/apis/queries/client';
import { ClientResponse, ClientResponseOpenStatusEnum } from '@/apis/swagger/data-contracts';
import { Box, Button, Dialog, DialogActions, DialogContent, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface IProps {
  data: ClientResponse;
  onClose: () => void;
}

const OpenCloseDialog = (props: IProps): React.ReactNode => {
  const { onClose, data } = props;
  const changeToOpen: boolean = data.openStatus !== ClientResponseOpenStatusEnum.OPEN;

  const [isDisabled, setIsDisabled] = useState<boolean>(!dayjs().isSame(dayjs(data.businessDate), 'd'));

  const openClient = useOpenClient();
  const closeClient = useCloseClient();

  const handleChangeStatus = async () => {
    setIsDisabled(true);

    const mutation = {
      [ClientResponseOpenStatusEnum.CLOSE]: openClient,
      [ClientResponseOpenStatusEnum.OPEN]: closeClient,
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
          {isDisabled && (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                Status cannot be updated due to a mismatch with the provided <span>opening date ({dayjs(data.businessDate).format('MMM d, YYYY')})</span>
              </Styled.Content>
            </Styled.ErrorBox>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleChangeStatus}
          disabled={isDisabled}
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
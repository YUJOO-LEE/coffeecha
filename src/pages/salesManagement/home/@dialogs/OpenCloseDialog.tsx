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
            영업을 <span>{changeToOpen ? '시작' : '종료'}</span> 하시겠습니까?
          </Styled.Content>
          {!isSameDate ? (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                설정된 <span>영업 예정일 ({dayjs(data.businessDate).format('MMM d, YYYY')})</span> 당일에만 영업을 시작할 수 있습니다.
              </Styled.Content>
            </Styled.ErrorBox>
          ) : changeToOpen && (
            <Styled.ErrorBox>
              <Styled.Content color={(theme) => theme.palette.error.main}>
                현재 출장지를 <span>영업 시작</span> 상태로 변경하면, 기존에 영업중인 출장지의 상태가 <span>영업 종료</span>로 변경됩니다.
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
          변경
        </Button>
        <Button variant="outlined" size="large" onClick={onClose}>
          취소
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
import { useGetClientDetail } from '@/apis/queries/client';
import { OpenStatus } from '@/apis/swagger/data-contracts';
import { CopyToClipboard } from '@/components/CopyToClipboard';
import OpenCloseDialog from '@/pages/salesManagement/home/@dialogs/OpenCloseDialog';
import { NotificationsRounded } from '@mui/icons-material';
import { Box, Button, Card, Chip, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'dayjs/locale/ko';

export const HomePage = () => {
  const { clientId } = useParams();
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  const [isChangeStatusOpen, setChangeStatusOpen] = useState<boolean>(false);

  const { data: clientDetail } = useGetClientDetail(Number(clientId));

  const isOpenDisabled: boolean = !clientDetail || !dayjs().isSame(dayjs(clientDetail?.businessDate), 'd');
  const changeToOpen: boolean = !!clientDetail && clientDetail.openStatus !== OpenStatus.OPEN;

  const handleChangeStatusOpen = () => {
    setChangeStatusOpen(true);
  };

  const handleClose = () => {
    setChangeStatusOpen(false);
  };

  return (
    <Box
      display="grid"
      gap="16px"
      gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
      gridTemplateRows="repeat(auto-fit, minmax(120px, 1fr))"
    >
      <Styled.SalesCard>
        <Box>
          <Chip size="small" label="판매 수량 집계" />
        </Box>
        <Styled.Quantity>
          <Typography fontSize="24px">
            {clientDetail?.saleQuantity || 0}
          </Typography>
          <Typography fontSize="12px" color="grey">전체 판매 수량</Typography>
          <Typography fontSize="24px">
            /
          </Typography>
          <Box />
          <Typography fontSize="24px">
            {clientDetail?.totalQuantity || 0}
          </Typography>
          <Typography fontSize="12px" color="grey">계약 수량</Typography>
        </Styled.Quantity>
      </Styled.SalesCard>
      <Styled.OpenCard>
        <Button
          disableElevation
          size="large"
          variant="contained"
          color={changeToOpen ? 'primary' : 'error'}
          startIcon={<NotificationsRounded />}
          onClick={handleChangeStatusOpen}
          disabled={changeToOpen && isOpenDisabled}
        >
          {changeToOpen ? '영업시작' : '영업종료'}
        </Button>
        {isOpenDisabled && (
          <Styled.OpenWarning>
            설정된 <span>영업 예정일</span> 당일에만 영업을 시작할 수 있습니다.
          </Styled.OpenWarning>
        )}
      </Styled.OpenCard>

      <Styled.InfoCard>
        <Box display="flex" alignItems="center" gap="8px">
          <Chip size="small" label="오늘 날짜" />
          <Typography>
            {dayjs().format('YYYY-MM-DD')}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <Chip size="small" label="영업 예정일" />
          <Typography>
            {dayjs(clientDetail?.businessDate).format('YYYY-MM-DD')}
          </Typography>
          <Typography color="grey">
            ({dayjs(clientDetail?.businessDate).fromNow()})
          </Typography>
        </Box>
        {clientDetail?.openStatus === OpenStatus.OPEN && (
          <Box display="flex" alignItems="center" gap="8px">
            <Chip size="small" label="ORDER PAGE" />
            <CopyToClipboard>
              {`${window.location.origin}/order/${clientDetail?.clientKey}`}
            </CopyToClipboard>
          </Box>
        )}
      </Styled.InfoCard>

      {isChangeStatusOpen && clientDetail && (
        <OpenCloseDialog
          data={clientDetail}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

const Styled = {
  InfoCard: styled(Card)({
    padding: '24px',
    gridColumn: 'span 2',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }),
  OpenCard: styled(Card)({
    padding: '24px',
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gap: '8px',
  }),
  OpenWarning: styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    fontWeight: '500',
    color: theme.palette.grey[600],
    '& span': {
      fontWeight: '700',
    },
  })),
  SalesCard: styled(Card)({
    padding: '24px',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '8px',
  }),
  Quantity: styled(Box)({
    justifySelf: 'center',
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: 'auto 1fr',
    gridAutoFlow: 'column',
    rowGap: '4px',
    columnGap: '8px',
  }),
};
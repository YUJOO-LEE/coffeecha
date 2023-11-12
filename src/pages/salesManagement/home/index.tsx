import { useGetClientDetail } from '@/apis/queries/client';
import { OpenStatus } from '@/apis/swagger/data-contracts';
import CopyToClipboard from '@/pages/components/CopyToClipboard';
import OpenCloseDialog from '@/pages/salesManagement/home/components/OpenCloseDialog';
import { NotificationsRounded } from '@mui/icons-material';
import { Box, Button, Card, Chip, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { clientId } = useParams();
  dayjs.extend(relativeTime);

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
      gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
      gridTemplateRows="repeat(auto-fit, minmax(180px, 1fr))"
    >
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
          Change to {changeToOpen ? 'Opend' : 'Closed'}
        </Button>
        {isOpenDisabled && (
          <Styled.OpenWarning>
            The store can only be opened if the <span>Opening date</span> is the same as <span>Today's date</span>.
          </Styled.OpenWarning>
        )}
      </Styled.OpenCard>

      <Styled.InfoCard>
        <Box display="flex" alignItems="center" gap="8px">
          <Chip size="small" label="TODAY" />
          <Typography>
            {dayjs().format('MMM D, YYYY')}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <Chip size="small" label="OPENING DATE" />
          <Typography>
            {dayjs(clientDetail?.businessDate).format('MMM D, YYYY')}
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
}

export default HomePage;

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
}
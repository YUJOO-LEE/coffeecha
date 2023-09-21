import { useGetClientDetail } from '@/apis/queries/client';
import { ClientResponseOpenStatusEnum } from '@/apis/swagger/data-contracts';
import Layout from '@/components/Layout';
import OpenCloseDialog from '@/pages/SalesManagement/home/components/OpenCloseDialog';
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
  const changeToOpen: boolean = !!clientDetail && clientDetail.openStatus !== ClientResponseOpenStatusEnum.OPEN;

  const handleChangeStatusOpen = () => {
    setChangeStatusOpen(true);
  };

  const handleClose = () => {
    setChangeStatusOpen(false);
  };

  return (
    <Layout>
      <Box
        display="grid"
        gap="16px"
        gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
        gridTemplateRows="repeat(auto-fit, minmax(180px, 1fr))"
      >
        <Styled.OpenCard>
          <Button
            size="large"
            variant="contained"
            color={changeToOpen ? 'primary' : 'error'}
            startIcon={<NotificationsRounded />}
            onClick={handleChangeStatusOpen}
            disabled={isOpenDisabled}
          >
            Change to {changeToOpen ? 'Opend' : 'Closed'}
          </Button>
          {isOpenDisabled && (
            <Styled.OpenWarning>
              <span>Opening date</span> must be provided to proceed.
            </Styled.OpenWarning>
          )}
        </Styled.OpenCard>

        <Styled.InfoCard>
          <Typography display="flex" alignItems="center" gap="8px">
            <Chip size="small" label="today" />
            {dayjs().format('MMM D, YYYY')}
          </Typography>
          <Typography display="flex" alignItems="center" gap="8px">
            <Chip size="small" label="opening date" />
            {dayjs(clientDetail?.businessDate).format('MMM D, YYYY')}
            <Typography color="grey"> ({dayjs(clientDetail?.businessDate).fromNow()})</Typography>
          </Typography>
        </Styled.InfoCard>
      </Box>

      {isChangeStatusOpen && clientDetail && (
        <OpenCloseDialog
          data={clientDetail}
          onClose={handleClose}
        />
      )}
    </Layout>
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
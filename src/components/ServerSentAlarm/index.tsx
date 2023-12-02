import { OrderQueryKey } from '@/apis/queries/salesManagement/order';
import { AlarmResponse } from '@/components/ServerSentAlarm/@types';
import { getAuthorization } from '@/util/auth';
import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const authorization = getAuthorization(true);
const sseApiUrl = `${import.meta.env.VITE_API_ROOT}/sse/open/connect?userId=1&auth=${authorization}`;

const alarmAction = (onMove: React.MouseEventHandler<HTMLButtonElement>) => () => {
  return (
    <Button variant="text" size="small" color="inherit" onClick={onMove}>
      Go to list
    </Button>
  );
};

export const ServerSentAlarm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const eventSource = useRef<EventSource>();

  const handleMove = useCallback((clientId: number) => () => {
    navigate(`/${clientId}/order`);
  }, [navigate]);

  const showAlarm = useCallback((event: MessageEvent<string>) => {
    queryClient.invalidateQueries([OrderQueryKey, 'list']);

    const alarmResponse: AlarmResponse = JSON.parse(event.data);
    const quantity = alarmResponse.totalQuantity - 1;
    const message = quantity > 1 ? `${alarmResponse.firstMenuName} 외 수량 ${quantity}` : alarmResponse.firstMenuName;
    enqueueSnackbar(message, { variant: 'info', action: alarmAction(handleMove(alarmResponse.clientId)) });
  }, [enqueueSnackbar, handleMove, queryClient]);

  useEffect(() => {
    eventSource.current = new EventSource(sseApiUrl, {
      withCredentials: true,
    });

    if (eventSource.current) {
      eventSource.current.onmessage = showAlarm;
    }

    return () => {
      eventSource.current?.close();
    };
  }, [showAlarm]);

  return (
    <>
    </>
  );
};
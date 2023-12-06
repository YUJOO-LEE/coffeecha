import { OrderQueryKey } from '@/apis/queries/salesManagement/order';
import { AlarmResponse } from '@/components/GlobalNavigation/@types';
import { getAuthorization } from '@/util/auth';
import { Button, styled, Tooltip } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

export const AlarmServerIndicator = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const eventSource = useRef<EventSource>();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const handleRefresh = () => {
    window.location.reload();
  };

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
      eventSource.current.onopen = () => {
        setIsOnline(true);
      };
      eventSource.current.onmessage = showAlarm;
      eventSource.current.onerror = () => {
        setIsOnline(false);
      };
    }

    return () => {
      eventSource.current?.close();
    };
  }, [showAlarm]);

  return (
    <Tooltip
      arrow
      disableHoverListener={isOnline}
      title={<Button variant="text" size="small" color="inherit" onClick={handleRefresh}>refresh</Button>}
    >
      <Styled.AlarmServerIndicator
        sx={(theme) => ({ backgroundColor: isOnline ? theme.palette.success.main : theme.palette.error.main })}
      />
    </Tooltip>
  );
};

const Styled = {
  AlarmServerIndicator: styled('span')({
    display: 'block',
    width: '100%',
    height: '8px',
    borderRadius: '4px',
  }),
};
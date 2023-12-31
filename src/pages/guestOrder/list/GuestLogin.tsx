import { guestInfoAtom, guestLoginAtom } from '@/pages/guestOrder/order/@atoms';
import { getPhoneNumber } from '@/util';
import { Box, Button, TextField } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { Form } from 'react-router-dom';

export const GuestLogin = (): React.ReactNode => {
  const setGuestLoginInfo = useSetAtom(guestLoginAtom);
  const [guestInfo, setGuestInfo] = useAtom(guestInfoAtom);

  const isEmpty = !guestInfo.guestName || !guestInfo.phoneNumber || guestInfo.phoneNumber.length < 12;

  const handleChange = (target: keyof typeof guestInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setGuestInfo((prev) => ({
      ...prev,
      [target]: target === 'phoneNumber' ? getPhoneNumber(value) : value,
    }));
  };

  const handleLogin = () => {
    if (!guestInfo.guestName || !guestInfo.phoneNumber) return;

    setGuestLoginInfo({
      guestName: guestInfo.guestName,
      phoneNumber: guestInfo.phoneNumber,
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="calc(100dvh - 56px - 48px)">
      <Form onSubmit={handleLogin}>
        <Box display="grid" gap="16px" width="260px">
          <TextField
            label="주문자/팀명"
            variant="outlined"
            size="small"
            value={guestInfo.guestName}
            onChange={handleChange('guestName')}
          />
          <TextField
            label="연락처"
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 13, inputMode: 'numeric' }}
            value={guestInfo.phoneNumber}
            onChange={handleChange('phoneNumber')}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            disabled={isEmpty}
          >
            주문조회
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
import { useLoginMutation } from '@/apis/queries/auth';
import { LoadingCircleProgress } from '@/components/LoadingCircleProgress';
import { CoffeeRounded } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

export const LoginPage = (): React.ReactNode => {
  const { enqueueSnackbar } = useSnackbar();

  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = useLoginMutation();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login.mutateAsync({ loginId, password });
  };

  useEffect(() => {
    if (!login.isError) return;
    enqueueSnackbar({ variant: 'error', message: 'Invalid username or password. Please try again.' });
  }, [login.isError, login.error, enqueueSnackbar]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px" width="100dvw" height="100dvh">
      <LoadingCircleProgress open={login.isLoading} />
      <Box display="flex" alignItems="center" gap="8px">
        <CoffeeRounded style={{ width: '30px', height: '30px' }} />
        <Typography variant="h1" fontSize="24px" fontWeight="700" textTransform="capitalize">
          coffeeCha!
        </Typography>
      </Box>
      <Form onSubmit={handleLogin}>
        <Box display="grid" gap="16px" width="260px">
          <TextField label="Username" variant="outlined" size="small" value={loginId} onChange={handleIdChange} />
          <TextField label="Password" type="password" variant="outlined" size="small" value={password} onChange={handlePasswordChange} />
          <Button type="submit" variant="contained" size="large" disableElevation>
            Login
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
import { useLoginMutation } from '@/apis/queries/auth';
import { CoffeeRounded } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const LoginPage = (): React.ReactNode => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutateAsync } = useLoginMutation();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    await mutateAsync({ loginId, password });
    navigate('/');
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px" width="100dvw" height="100dvh">
      <Box display="flex" alignItems="center" gap="8px">
        <CoffeeRounded style={{ width: '36px', height: '36px' }} />
        {/*<Typography variant="h1" fontSize="36px" textTransform="capitalize">*/}
        {/*  coffee car*/}
        {/*</Typography>*/}
      </Box>
      <Form onSubmit={handleLogin}>
        <Box display="grid" gap="16px" width="260px">
          <TextField label="ID" variant="outlined" size="small" value={loginId} onChange={handleIdChange} />
          <TextField label="Password" type="password" variant="outlined" size="small" value={password} onChange={handlePasswordChange} />
          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default LoginPage;
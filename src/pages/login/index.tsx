import { CoffeeRounded } from '@mui/icons-material';
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage = (): React.ReactNode => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px" width="100dvw" height="100dvh">
      <Box display="flex" alignItems="center" gap="8px">
        <CoffeeRounded style={{ width: '36px', height: '36px' }} />
        <Typography variant="h1" fontSize="36px" textTransform="capitalize">
          coffee car
        </Typography>
      </Box>
      <Box display="grid" gap="16px" width="260px">
        <TextField label="ID" variant="outlined" size="small" />
        <TextField label="Password" variant="outlined" size="small" />
        <Button variant="contained" size="large">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
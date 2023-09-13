import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const MenuInfoTooltip = (): React.ReactNode => {
  return (
    <Box padding="4px 4px 8px" display="grid" gap="8px">
      <Typography>
        description
      </Typography>
      <Divider color="white" />
      <Typography fontSize="12px" fontWeight="300">
        option 1
      </Typography>
      <Typography fontSize="12px" fontWeight="300">
        option 2
      </Typography>
    </Box>
  );
};

export default MenuInfoTooltip;
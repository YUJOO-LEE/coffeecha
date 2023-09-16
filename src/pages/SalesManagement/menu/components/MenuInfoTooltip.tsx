import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  data?: ClientMenuResponse;
}

const MenuInfoTooltip = (props: IProps): React.ReactNode => {
  const { data } = props;

  return (
    <Box padding="8px 4px" display="grid" gap="8px">
      {data?.menuDescription && (
        <Typography>
          {data?.menuDescription}
        </Typography>
      )}
      {data?.menuDescription && data.optionNames.length > 0 && (
        <Divider color="white" />
      )}
      {data?.optionNames.map((optionName) => (
        <Typography key={`option_${optionName}`} fontSize="12px">
          {optionName}
        </Typography>
      ))}
    </Box>
  );
};

export default MenuInfoTooltip;
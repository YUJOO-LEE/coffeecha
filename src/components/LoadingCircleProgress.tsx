import { CircularProgress, Dialog, Typography, styled } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  progress?: number;
}

export const LoadingCircleProgress = (props: Props): React.ReactNode => {
  const { open, progress } = props;

  return (
    <Dialog open={open}>
      <Styled.Circle />
      {progress !== undefined && (
        <Styled.Progress>
          <Typography fontSize="12px" color={(theme) => theme.palette.grey[600]}>
            {progress}%
          </Typography>
        </Styled.Progress>
      )}
    </Dialog>
  );
};

const Styled = {
  Circle: styled(CircularProgress)({
    margin: '20px',
  }),
  Progress: styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
}
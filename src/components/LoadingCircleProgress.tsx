import { CircularProgress, Dialog, Typography, styled } from '@mui/material';
import React from 'react';

interface IProps {
  open: boolean;
  progress?: number;
}

const LoadingCircleProgress = (props: IProps): React.ReactNode => {
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

export default LoadingCircleProgress;

const Styled = {
  Circle: styled(CircularProgress)({
    margin: '20px',
  }),
  Progress: styled('div')({
    position: 'absolute',
    top: '32px',
    width: '82px',
    textAlign: 'center',
  }),
}
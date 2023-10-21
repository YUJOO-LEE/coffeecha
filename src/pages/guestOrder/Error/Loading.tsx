import { CloudRounded, LocalShippingRounded } from '@mui/icons-material';
import { keyframes, styled } from '@mui/material';
import { CSSProperties } from '@mui/system/CSSProperties';
import React from 'react';

const Loading = (): React.ReactNode => {

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <Styled.Truck />
        <Styled.BackDrop>
          <Styled.Cloud1 />
          <Styled.Cloud2 />
          <Styled.Cloud3 />
          <Styled.Cloud4 />
          <Styled.Cloud5 />
        </Styled.BackDrop>
      </Styled.Box>
    </Styled.Wrapper>
  );
};

export default Loading;

const Keyframes = {
  Truck: keyframes({
    ['0%']: {
      transform: 'translate(-50%, -50%)',
    },
    ['100%']: {
      transform: 'translate(-50%, -60%)',
    },
  }),
  Cloud: keyframes({
    ['0%']: {
      right: '0',
      transform: 'translateX(100%)',
    },
    ['100%']: {
      right: '100%',
      transform: 'translateX(-100%)',
    },
  }),
};

const CloudCommon: CSSProperties = {
  position: 'absolute',
  width: '24px',
  height: '24px',
  opacity: '.1',
};

const Styled = {
  Wrapper: styled('div')({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Box: styled('div')({
    position: 'relative',
    width: '180px',
    height: '180px',
  }),
  Truck: styled(LocalShippingRounded)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10,
    width: '48px',
    height: '48px',
    transform: 'translate(-50%, -50%)',
    animation: `${Keyframes.Truck} .3s 1s infinite linear alternate`,
    '& path': {
      fill: theme.palette.primary.main,
    },
  })),
  BackDrop: styled('div')({
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '8px',
  }),
  Cloud1: styled(CloudRounded)({
    ...CloudCommon,
    top: '10%',
    animation: `${Keyframes.Cloud} 3.5s linear .5s infinite`,
  }),
  Cloud2: styled(CloudRounded)({
    ...CloudCommon,
    top: '40%',
    animation: `${Keyframes.Cloud} 2s linear .2s infinite`,
  }),
  Cloud3: styled(CloudRounded)({
    ...CloudCommon,
    top: '70%',
    width: '44px',
    height: '44px',
    animation: `${Keyframes.Cloud} 1s linear .3s infinite`,
  }),
  Cloud4: styled(CloudRounded)({
    ...CloudCommon,
    top: '30%',
    width: '36px',
    height: '36px',
    animation: `${Keyframes.Cloud} 2.5s linear 1s infinite`,
  }),
  Cloud5: styled(CloudRounded)({
    ...CloudCommon,
    top: '60%',
    width: '36px',
    height: '36px',
    animation: `${Keyframes.Cloud} 1.3s linear .5s infinite`,
  }),
};
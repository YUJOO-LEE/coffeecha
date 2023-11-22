import { ContentCopyRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';

type Props = {
  children: string;
}

export const CopyToClipboard = (props: Props & React.HTMLAttributes<HTMLDivElement>): React.ReactNode => {
  const { children, ...restProps } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = async () => {
    await window.navigator.clipboard.writeText(children);
    enqueueSnackbar('Copied to clipboard', { variant: 'success' });
  };

  return (
    <Styled.Wrapper onClick={handleCopy} {...restProps}>
      <Styled.Text title={children}>
        {children}
      </Styled.Text>
      <Styled.Icon />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled('div')(({ theme }) => ({
    maxWidth: '100%',
    width: 'fit-content',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '20px',

    '&:hover': {
      '& p': {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
      },

      '& svg': {
        display: 'block',
      },
    },
  })),
  Text: styled(Typography)(({ theme }) => ({
    margin: 'initial',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '16px',
    fontWeight: theme.typography.fontWeightRegular,

    '&::after': {
      content: 'attr(title)',
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightMedium,
      display: 'block',
      height: '0',
      visibility: 'hidden',
    },
  })),
  Icon: styled(ContentCopyRounded)(({ theme }) => ({
    display: 'none',
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: '50%',
    right: '0',
    transform: 'translateY(-50%)',

    '& path': {
      fill: theme.palette.primary.main,
    },
  })),
};
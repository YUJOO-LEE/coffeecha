import GuestProfile from '@/pages/guestOrder/Cart/GuestProfile';
import { ErrorRounded } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  isError: boolean;
  isEmpty: boolean;
  onReset: () => void;
}

const CartAction = (props: IProps): React.ReactNode => {
  const { isError, isEmpty, onReset } = props;

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleOrderOpen = () => {
    if (isEmpty) return;
    setIsProfileOpen(true);
  };

  const handleOrderClose = () => {
    setIsProfileOpen(false);
  };


  return (
    <Box display="flex" justifyContent="flex-end" gap="8px">
      <Button variant="text" size="medium" color="primary" onClick={onReset}>
        초기화
      </Button>
      <Tooltip
        arrow
        title={
          <Typography>
            {isEmpty && '주문할 메뉴를 선택하세요'}
            {isError && (
              <>
                주문 가능한 수량을 초과했습니다<br />
                잔여 수량을 확인 해 주세요
              </>
            )}
          </Typography>
        }
        disableHoverListener={!isError && !isEmpty}
      >
        <span>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            disableElevation
            onClick={handleOrderOpen}
            disabled={isError || isEmpty}
            startIcon={(isError || isEmpty) ? <ErrorRounded /> : undefined}
          >
            주문하기
          </Button>
        </span>
      </Tooltip>

      {isProfileOpen && (
        <GuestProfile onClose={handleOrderClose} />
      )}
    </Box>
  );
};

export default CartAction;
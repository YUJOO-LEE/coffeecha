import { ErrorRounded } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  isError: boolean;
  isEmpty: boolean;
  onReset: () => void;
  onOrder: () => void;
}

const CartAction = (props: IProps): React.ReactNode => {
  const { isError, isEmpty, onOrder, onReset } = props;

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
                더 이상 주문할 수 없는 메뉴가 담겨있습니다<br />
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
            onClick={onOrder}
            disabled={isError || isEmpty}
            startIcon={(isError || isEmpty) ? <ErrorRounded /> : undefined}
          >
            주문하기
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
};

export default CartAction;
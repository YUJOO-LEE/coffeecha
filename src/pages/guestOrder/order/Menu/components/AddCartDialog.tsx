import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { CartItem } from '@/pages/guestOrder/order/atoms';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Props {
  clientKey: string;
  data: ClientMenuResponse;
  onClose: () => void;
  cartList: CartItem[];
  onAdd: (newItem: CartItem) => void;
}

const AddCartDialog = (props: Props): React.ReactNode => {
  const { clientKey, data, onClose, onAdd, cartList } = props;

  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const availableQuantityToOrder = Math.max(data.stockQuantity - data.saleQuantity, 0);
  const cartQuantity = cartList
  ?.reduce((prev, { quantity, menuInfo }) => menuInfo.clientMenuId === data.clientMenuId ? prev + quantity : prev, 0);
  const isIncreaseDisable = (quantity + cartQuantity) >= availableQuantityToOrder;
  const isError = (quantity + cartQuantity) > availableQuantityToOrder;

  const handleOptionsSelect = (selected: string) => () => {
    setSelectedOptions((prev) => {
      const newList = [...prev];
      const findIndex = prev.findIndex((value) => value === selected);

      if (findIndex > -1) {
        newList.splice(findIndex, 1);
        return newList.sort();
      }

      return [...newList, selected].sort();
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleIncrease = () => {
    if (isIncreaseDisable) return;

    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const handleAdd = () => {
    setIsDisable(true);
    const newItem: CartItem = {
      clientKey,
      menuInfo: data,
      options: selectedOptions,
      quantity,
    };

    onAdd(newItem);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        {data.menuName}
        <Box>
          <ButtonGroup>
            <Button disableElevation variant="contained" onClick={handleDecrease}>
              -
            </Button>
            <Styled.Quantity disableRipple>{quantity}</Styled.Quantity>
            <Button disableElevation variant="contained" onClick={handleIncrease} disabled={isIncreaseDisable}>
              +
            </Button>
          </ButtonGroup>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: '16px' }}>
        <Typography fontSize="14px" color={(theme) => theme.palette.grey[600]}>
          {data.menuDescription}
        </Typography>
        <Styled.OptionList>
          {data.optionNames.map((name, index) => (
            <label key={`option_${index}`}>
              <Checkbox checked={selectedOptions.includes(name)} onChange={handleOptionsSelect(name)} />
              <Typography fontSize="14px">
                {name}
              </Typography>
            </label>
          ))}
        </Styled.OptionList>
        {isError && (
          <Alert severity="error">
            잔여 수량 이상 주문할 수 없습니다. <strong>잔여 수량 : {availableQuantityToOrder}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="medium" onClick={onClose}>
          닫기
        </Button>
        <Button variant="contained" size="medium" disableElevation disabled={isDisable || isError} onClick={handleAdd}>
          메뉴 추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCartDialog;

const Styled = {
  OptionList: styled('ul')({
    display: 'grid',
    '& label': {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
  }),
  Quantity: styled(Button)({
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  }),
};
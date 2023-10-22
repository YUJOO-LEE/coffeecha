import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
import { cartAtom, CartItem } from '@/pages/guestOrder/atoms';
import {
  Box,
  Button, ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';

interface Props {
  clientKey: string;
  data: ClientMenuResponse;
  onClose: () => void;
}

const AddCartDialog = (props: Props): React.ReactNode => {
  const { clientKey, data, onClose } = props;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const setCart = useSetAtom(cartAtom);

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
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const handleAdd = () => {
    const newItem: CartItem = {
      clientKey,
      menuInfo: data,
      options: selectedOptions,
      quantity,
    }

    setCart((prev) => ([
      ...prev,
      newItem,
    ]));

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        {data.menuName}
        <Box>
          <ButtonGroup>
            <Button disableElevation variant="contained" onClick={handleDecrease}>-</Button>
            <Styled.Quantity disableRipple>{quantity}</Styled.Quantity>
            <Button disableElevation variant="contained" onClick={handleIncrease}>+</Button>
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
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" size="medium" disableElevation onClick={handleAdd}>
          Add Cart
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
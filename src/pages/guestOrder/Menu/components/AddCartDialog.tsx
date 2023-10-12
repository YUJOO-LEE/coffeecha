import { ClientMenuResponse } from '@/apis/swagger/data-contracts';
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
import React, { useState } from 'react';

interface IProps {
  data: ClientMenuResponse;
  onClose: () => void;
}

const AddCartDialog = (props: IProps): React.ReactNode => {
  const { data, onClose } = props;

  const [quantity, setQuantity] = useState<number>(1);

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
              <Checkbox />
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
        <Button variant="contained" size="medium" disableElevation>
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
}
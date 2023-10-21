import { useGetCategoryForGuest } from '@/apis/queries/guestOrder';
import { Button, ButtonGroup, styled } from '@mui/material';
import React from 'react';

interface IProps {
  clientKey: string;
  category?: number;
  onCategorySelect: (target?: number) => void;
}

const MenuHeader = (props: IProps): React.ReactNode => {
  const { clientKey, category, onCategorySelect } = props;

  const { data: categoryList } = useGetCategoryForGuest(clientKey);

  const handleSelect = (target?: number) => () => {
    onCategorySelect(target);
  };

  return (
    <Styled.Wrapper fullWidth disableElevation variant="contained" size="large">
      <Button
        onClick={handleSelect()}
        sx={(theme) => ({ backgroundColor: !category ? theme.palette.primary.dark : undefined})}
      >
        All
      </Button>
      {categoryList?.map(({ id, name }) => (
        <Button
          key={`category_${id}`}
          onClick={handleSelect(id)}
          sx={(theme) => ({ backgroundColor: category === id ? theme.palette.primary.dark : undefined})}
        >
          {name}
        </Button>
      ))}
    </Styled.Wrapper>
  );
};

export default MenuHeader;

const Styled = {
  Wrapper: styled(ButtonGroup)({
    overflow: 'hidden',
      '& button': {
      padding: '12px',
    },
  }),
};
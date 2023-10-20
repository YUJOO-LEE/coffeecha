import { useGetCategoryForGuest } from '@/apis/queries/guestOrder';
import { Button, ButtonGroup, styled } from '@mui/material';
import React from 'react';

interface IProps {
  onCategorySelect: (target?: number) => void;
}

const MenuHeader = (props: IProps): React.ReactNode => {
  const { onCategorySelect } = props;

  const { data: categoryList } = useGetCategoryForGuest();

  const handleSelect = (target?: number) => () => {
    onCategorySelect(target);
  };

  return (
    <Styled.Wrapper fullWidth disableElevation variant="contained" size="large">
      <Button onClick={handleSelect()}>
        All
      </Button>
      {categoryList?.map(({ id, name }) => (
        <Button key={`category_${id}`} onClick={handleSelect(id)}>
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
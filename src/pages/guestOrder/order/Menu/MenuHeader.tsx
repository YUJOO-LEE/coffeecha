import { useGetCategoryForGuest } from '@/apis/queries/guestOrder';
import { styled, Tab, Tabs } from '@mui/material';
import React from 'react';

interface IProps {
  clientKey: string;
  category: number | 'all';
  onCategorySelect: (target: number | 'all') => void;
}

const MenuHeader = (props: IProps): React.ReactNode => {
  const { clientKey, category, onCategorySelect } = props;

  const { data: categoryList } = useGetCategoryForGuest(clientKey);

  const handleSelect = (target: number | 'all') => () => {
    onCategorySelect(target);
  };

  return (
    <Styled.Wrapper>
      <Styled.Tabs
        value={category}
        variant="scrollable"
        textColor="inherit"
        scrollButtons="auto"
        selectionFollowsFocus
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <Tab
          onClick={handleSelect('all')}
          label="전체"
          value="all"
          sx={(theme) => ({ backgroundColor: category === 'all' ? `${theme.palette.primary.dark} !important` : undefined})}
        />
        {categoryList?.map(({ id, name }) => (
          <Tab
            key={`category_${id}`}
            label={name}
            value={id}
            onClick={handleSelect(id)}
            sx={(theme) => ({ backgroundColor: category === id ? `${theme.palette.primary.dark} !important` : undefined})}
          />
        ))}
      </Styled.Tabs>
    </Styled.Wrapper>
  );
};

export default MenuHeader;

const Styled = {
  Wrapper: styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
  })),
  Tabs: styled(Tabs)(({ theme }) => ({
    '& button': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      opacity: '1',
      '&:last-of-type': {
        borderRadius: '0 4px 4px 0',
      },
      '&:first-of-type': {
        borderRadius: '4px 0 0 4px',
      },
    },
    '& .MuiTabs-scrollButtons path': {
      fill: theme.palette.common.white,
    },
  })),
};
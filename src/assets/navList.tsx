import { CoffeeRounded, FormatListBulletedRounded, HomeRounded, SettingsRounded } from '@mui/icons-material';
import React from 'react';

interface INavItem {
  label: string;
  icon?: React.ReactNode;
  url: string;
}

const navList: INavItem[] = [
  {
    label: 'Home',
    url: '/',
    icon: <HomeRounded />,
  },
  {
    label: 'Order',
    url: '/order',
    icon: <FormatListBulletedRounded />,
  },
  {
    label: 'Menu',
    url: '/menu',
    icon: <CoffeeRounded />,
  },
  {
    label: 'Setting',
    url: '/setting',
    icon: <SettingsRounded />,
  },
];

export default navList;
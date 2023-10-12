import { CoffeeRounded, FormatListBulletedRounded, HomeRounded, SettingsRounded, LocalShippingRounded, CoffeeMakerRounded } from '@mui/icons-material';
import React from 'react';

interface NavItem {
  label: string;
  icon?: React.ReactNode;
  url: string;
}

export const clientNavList = (clientId: string): NavItem[] => {
  return [
    {
      label: 'Home',
      url: `/${clientId}/`,
      icon: <HomeRounded />,
    },
    {
      label: 'Order',
      url: `/${clientId}/order`,
      icon: <FormatListBulletedRounded />,
    },
    {
      label: 'Menu',
      url: `/${clientId}/menu`,
      icon: <CoffeeRounded />,
    },
    {
      label: 'Setting',
      url: `/${clientId}/setting`,
      icon: <SettingsRounded />,
    },
  ];
};

export const userNavList: NavItem[] = [
  {
    label: 'Clients',
    url: '/',
    icon: <LocalShippingRounded />,
  },
  {
    label: 'Collection',
    url: '/collection',
    icon: <CoffeeMakerRounded />,
  },
];
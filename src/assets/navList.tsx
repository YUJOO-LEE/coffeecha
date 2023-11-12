import {
  CoffeeMakerRounded,
  CoffeeRounded,
  HomeRounded,
  LocalShippingRounded,
  ManageAccountsRounded,
  PointOfSaleRounded,
  ReceiptLongRounded,
  SettingsRounded,
} from '@mui/icons-material';
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
      icon: <ReceiptLongRounded />,
    },
    {
      label: 'New Order',
      url: `/${clientId}/order/new`,
      icon: <PointOfSaleRounded />,
    },
    {
      label: 'Menu',
      url: `/${clientId}/menu`,
      icon: <CoffeeRounded />,
    },
    {
      label: 'Settings',
      url: `/${clientId}/settings`,
      icon: <ManageAccountsRounded />,
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
  {
    label: 'Settings',
    url: '/settings',
    icon: <SettingsRounded />,
  },
];
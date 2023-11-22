import { ClientResponse } from '@/apis/swagger/data-contracts';
import { isClosedClient } from '@/util';
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
  isHide?: boolean;
}

export const clientNavList = (clientInfo: ClientResponse): NavItem[] => {
  const { clientId } = clientInfo;

  const navList = [
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
      isHide: isClosedClient(clientInfo),
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

  return navList.filter(({ isHide }) => !isHide);
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
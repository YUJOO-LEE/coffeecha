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
      label: '홈',
      url: `/${clientId}/`,
      icon: <HomeRounded />,
    },
    {
      label: '주문 관리',
      url: `/${clientId}/order`,
      icon: <ReceiptLongRounded />,
    },
    {
      label: '신규 주문 등록',
      url: `/${clientId}/order/new`,
      icon: <PointOfSaleRounded />,
      isHide: isClosedClient(clientInfo),
    },
    {
      label: '판매 메뉴',
      url: `/${clientId}/menu`,
      icon: <CoffeeRounded />,
    },
    {
      label: '고객사 설정',
      url: `/${clientId}/settings`,
      icon: <ManageAccountsRounded />,
    },
  ];

  return navList.filter(({ isHide }) => !isHide);
};

export const userNavList: NavItem[] = [
  {
    label: '고객 관리',
    url: '/',
    icon: <LocalShippingRounded />,
  },
  {
    label: '전체 메뉴',
    url: '/collection',
    icon: <CoffeeMakerRounded />,
  },
  {
    label: '계정 설정',
    url: '/settings',
    icon: <SettingsRounded />,
  },
];
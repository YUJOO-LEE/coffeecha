import { AuthToken } from '@/apis/swagger/AuthToken';
import { CategoryController } from '@/apis/swagger/CategoryController';
import { Client } from '@/apis/swagger/Client';
import { ClientMenu } from '@/apis/swagger/ClientMenu';
import { ClientOrder } from '@/apis/swagger/ClientOrder';
import { ApiConfig, HttpClient } from '@/apis/swagger/http-client';
import { Image } from '@/apis/swagger/Image';
import { Menu } from '@/apis/swagger/Menu';
import { MenuOption } from '@/apis/swagger/MenuOption';
import { OrderPage } from '@/apis/swagger/OrderPage';
import { User } from '@/apis/swagger/User';
import { getAuthorization } from '@/util/auth';
import { InternalAxiosRequestConfig } from 'axios';

const axiosConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_API_ROOT,
};

export const http = new HttpClient(axiosConfig);

export const authApi = new AuthToken(http);
export const clientApi = new Client(http);
export const categoryApi = new CategoryController(http);
export const userApi = new User(http);
export const collectionApi = new Menu(http);
export const menuApi = new ClientMenu(http);
export const orderApi = new ClientOrder(http);
export const menuOptionApi = new MenuOption(http);
export const guestOrderApi = new OrderPage(http);
export const imageApi = new Image(http);

http.instance.interceptors.request.use((config) => {
  const newConfig: InternalAxiosRequestConfig = {
    ...config,
  };

  const authorization = getAuthorization();
  if (authorization) {
    newConfig.headers.setAuthorization(authorization);
  }

  return newConfig;
});
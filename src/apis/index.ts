import { queryClient } from '@/apis/queries';
import { clearAuth } from '@/apis/queries/auth';
import { AuthToken } from '@/apis/swagger/AuthToken';
import { CategoryController } from '@/apis/swagger/CategoryController';
import { Client } from '@/apis/swagger/Client';
import { ClientMenu } from '@/apis/swagger/ClientMenu';
import { ClientOrder } from '@/apis/swagger/ClientOrder';
import { TokenInfo } from '@/apis/swagger/data-contracts';
import { HttpClient } from '@/apis/swagger/http-client';
import { Image } from '@/apis/swagger/Image';
import { Menu } from '@/apis/swagger/Menu';
import { MenuOption } from '@/apis/swagger/MenuOption';
import { OrderPage } from '@/apis/swagger/OrderPage';
import { User } from '@/apis/swagger/User';
import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {},
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

(function initializeToErrorHandling() {
  const responseInterceptor = async (error?: any) => {
    if (error.config?.url.indexOf('/auth/refresh') >= 0) {
      clearAuth(queryClient);
      return;
    }

    const status = error.response.status;

    if (status === 403) {
      clearAuth(queryClient);
      location.replace('/login');
      return;
    }

    return Promise.reject(error);
  };

  axios.interceptors.response.use(undefined, responseInterceptor);

  http.instance.interceptors.response.use(undefined, responseInterceptor);
})();

http.instance.interceptors.request.use((config) => {
  const newConfig: InternalAxiosRequestConfig = {
    ...config,
  };

  const authData = queryClient.getQueryData<TokenInfo>(['auth']);
  const accessToken = authData?.accessToken;
  const grandType = authData?.grandType;

  if (accessToken && grandType) {
    newConfig.headers.setAuthorization(`${grandType} ${accessToken}`);
  }

  return newConfig;
});
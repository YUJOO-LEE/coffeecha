import { clearAuth } from '@/apis/queries/auth';
import { AuthToken } from '@/apis/swagger/AuthToken';
import { CategoryController } from '@/apis/swagger/CategoryController';
import { Client } from '@/apis/swagger/Client';
import { ClientMenu } from '@/apis/swagger/ClientMenu';
import { TokenInfo } from '@/apis/swagger/data-contracts';
import { HttpClient } from '@/apis/swagger/http-client';
import { Menu } from '@/apis/swagger/Menu';
import { MenuOption } from '@/apis/swagger/MenuOption';
import { User } from '@/apis/swagger/User';
import { queryClient } from '@/App';
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
export const menuOptionApi = new MenuOption(http);

(function initializeToErrorHandling() {
  const requestWaitQueue: ((token: string) => void)[] = [];
  // let isInProgressRefreshToken = false;

  // function report(message: string, unknown?: boolean) {
  // }

  // async function updateToken() {
  //   isInProgressRefreshToken = true;
  //
  //   const data = queryClient.getQueryData<TokenInfo>(['auth']);
  //   const refreshToken = data?.refreshToken;
  //
  //   try {
  //     if (refreshToken) {
  //       const response = await authApi.refresh({
  //         refreshToken,
  //       });
  //
  //       const { accessToken } = response.data;
  //
  //       setAuth(queryClient, { accessToken, refreshToken });
  //
  //       return accessToken;
  //     } else {
  //       throw new Error('refresh token is not exist.');
  //     }
  //   } catch (e) {
  //     clearAuth(queryClient);
  //   } finally {
  //     isInProgressRefreshToken = false;
  //   }
  // }

  const responseInterceptor = async (error?: any) => {
    if (error.config?.url.indexOf('/auth/refresh') >= 0) {
      clearAuth(queryClient);
      return;
    }

    const status = error.response.status;

    if (error.config && status === 401) {
      const { config: requestConfigToRetry } = error;

      // if (!isInProgressRefreshToken) {
      //   updateToken().then((accessToken) => {
      //     while (accessToken && requestWaitQueue.length > 0) {
      //       const waitingRequest = requestWaitQueue.shift();
      //
      //       if (waitingRequest) {
      //         waitingRequest(accessToken);
      //       }
      //     }
      //   });
      // }

      return new Promise((resolve) => {
        requestWaitQueue.push((newAccessToken) => {
          requestConfigToRetry['headers'] = {
            ...requestConfigToRetry.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          resolve(axios.request(requestConfigToRetry));
        });
      });
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

  console.log('#####', authData);

  if (accessToken && grandType) {
    newConfig.headers.setAuthorization(`${grandType} ${accessToken}`);
  }

  return newConfig;
});
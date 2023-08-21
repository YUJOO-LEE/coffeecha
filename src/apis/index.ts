import { AuthToken } from '@/apis/swagger/AuthToken';
import { CategoryController } from '@/apis/swagger/CategoryController';
import { Client } from '@/apis/swagger/Client';
import { ClientMenu } from '@/apis/swagger/ClientMenu';
import { HttpClient } from '@/apis/swagger/http-client';
import { Menu } from '@/apis/swagger/Menu';
import { MenuOption } from '@/apis/swagger/MenuOption';
import { User } from '@/apis/swagger/User';

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
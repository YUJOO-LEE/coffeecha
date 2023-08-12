import { CategoryController } from '@/apis/swagger/CategoryController';
import { Client } from '@/apis/swagger/Client';
import { HttpClient } from '@/apis/swagger/http-client';
import { User } from '@/apis/swagger/User';
import { UserMenu } from '@/apis/swagger/UserMenu';

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {},
};

export const http = new HttpClient(axiosConfig);

export const clientApi = new Client(http);
export const categoryApi = new CategoryController(http);
export const userApi = new User(http);
export const userMenuApi = new UserMenu(http);
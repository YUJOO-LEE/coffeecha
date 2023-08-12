/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserRequest {
  name?: string;
  password?: string;
}

export interface CreateUserMenuRequest {
  name: string;
  imageUrl?: string;
  description?: string;
  /** @format int64 */
  categoryId: number;
  /** @format int64 */
  userId: number;
}

export interface SaveResponse {
  /** @format int64 */
  id: number;
}

export interface SaveClientRequest {
  name: string;
  address: string;
  phoneNumber: string;
  /** @format date */
  businessDate: string;
  /** @format int64 */
  userId: number;
}

export interface CategoryRequest {
  name: string;
  /** @format int32 */
  priorityOrder: number;
}

export interface UpdateUserMenuRequest {
  name?: string;
  imageUrl?: string;
  description?: string;
  /** @format int64 */
  categoryId?: number;
}

export interface UpdateClientRequest {
  name?: string;
  address?: string;
  phoneNumber?: string;
  /** @format date */
  businessDate?: string;
}

export interface UserMenuResponse {
  /** @format int64 */
  userMenuId: number;
  userMenuName: string;
  imageUrl?: string;
  description?: string;
}

/** 클라이언트 조회 Response */
export interface ClientResponse {
  /** @format int64 */
  clientId: number;
  clientName: string;
  address?: string;
  phoneNumber?: string;
  /** @format date */
  businessDate?: string;
}

export interface CategoryResponse {
  /** @format int64 */
  id: number;
  name: string;
}

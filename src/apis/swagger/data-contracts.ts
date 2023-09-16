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
  loginId: string;
  password: string;
}

export interface CreateMenuRequest {
  name: string;
  imageUrl?: string;
  description?: string;
  /** @format int64 */
  categoryId: number;
  menuOptionIds?: number[];
}

export interface SaveResponse {
  /** @format int64 */
  id: number;
}

export interface SaveMenuOptionRequest {
  name: string;
}

export interface SaveClientRequest {
  name: string;
  address: string;
  phoneNumber: string;
  /** @format date */
  businessDate: string;
}

export interface SaveClientMenuRequest {
  menuIds?: number[];
}

export interface CategoryRequest {
  name: string;
  /** @format int32 */
  priorityOrder: number;
}

export interface TokenRequest {
  loginId: string;
  password: string;
}

export interface TokenInfo {
  grandType?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface UpdateMenuRequest {
  name?: string;
  imageUrl?: string;
  description?: string;
  /** @format int64 */
  categoryId?: number;
  menuOptionIds?: number[];
}

export interface UpdateMenuOptionRequest {
  name: string;
}

export interface UpdateClientRequest {
  name?: string;
  address?: string;
  phoneNumber?: string;
  /** @format date */
  businessDate?: string;
}

export interface MenuResponse {
  /** @format int64 */
  menuId: number;
  menuName: string;
  imageUrl?: string;
  description?: string;
  /** @format int64 */
  categoryId: number;
  menuOptionIds?: number[];
}

export interface MenuOptionResponse {
  /** @format int64 */
  menuOptionId?: number;
  menuOptionName?: string;
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

export interface ClientMenuResponse {
  /** @format int64 */
  clientMenuId: number;
  /** @format int32 */
  stockQuantity: number;
  /** @format int32 */
  saleQuantity: number;
  menuName: string;
  menuImageUrl?: string;
  menuDescription?: string;
  /** @format int64 */
  categoryId: number;
  optionNames: string[];
}

export interface CategoryResponse {
  /** @format int64 */
  id: number;
  name: string;
}

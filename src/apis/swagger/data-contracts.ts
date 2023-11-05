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

export interface OrderMenuRequest {
  /** @format int64 */
  clientMenuId?: number;
  /** @format int32 */
  quantity?: number;
  option?: string;
}

export interface OrderRequest {
  guestName: string;
  /** @pattern ^01[016789]-\d{3,4}-\d{4}$ */
  phoneNumber?: string;
  orderList: OrderMenuRequest[];
  message?: string;
}

export interface OrderResponse {
  orderKey: string;
}

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
  businessDate?: string;
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

export interface UpdateClientMenuRequest {
  /** @format int32 */
  stockQuantity?: number;
  /** @format int32 */
  saleQuantity?: number;
}

export interface OrderDetailResponse {
  guestName: string;
  status: OrderStatus;
  phoneNumber: string;
  message?: string;
  orderList: OrderMenuInfo[];
  /** @format date-time */
  orderDateTime?: string;
}

export interface OrderMenuInfo {
  menuName: string;
  /** @format int32 */
  orderQuantity?: number;
  menuOption?: string;
  imageUrl?: string;
}

export enum OrderStatus {
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_ACCEPTED = "ORDER_ACCEPTED",
  WAITING_FOR_PICKUP = "WAITING_FOR_PICKUP",
  PICKUP_COMPLETE = "PICKUP_COMPLETE",
  ORDER_CANCELLED = "ORDER_CANCELLED",
}

export interface GuestOrderResponse {
  /** @format date-time */
  orderDateTime: string;
  clientName: string;
  orderStatus: OrderStatus;
  orderKey: string;
  userName: string;
}

export enum OpenStatus {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface OrderClientResponse {
  /** @format int64 */
  clientId: number;
  clientName: string;
  address: string;
  userName: string;
  userPhoneNumber: string;
  /** @format date */
  businessDate: string;
  openStatus: OpenStatus;
  clientKey: string;
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
  menuHidden: boolean;
  /** @format int64 */
  categoryId: number;
  optionNames: string[];
}

export interface CategoryResponse {
  /** @format int64 */
  id: number;
  name: string;
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

export interface ImageUploadUrlResponse {
  uploadUrl: string;
}

/** 클라이언트 조회 Response */
export interface ClientResponse {
  /** @format int64 */
  clientId: number;
  clientName: string;
  address: string;
  phoneNumber: string;
  /** @format date */
  businessDate: string;
  openStatus: OpenStatus;
  clientKey: string;
}

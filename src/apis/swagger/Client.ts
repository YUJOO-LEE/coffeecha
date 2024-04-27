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

import {
  ClientOrderResponse,
  ClientResponse,
  OrderStatus,
  SaveClientRequest,
  SaveResponse,
  UpdateClientRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Client<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 사용자 클라이언트 조회 API
   *
   * @tags Client
   * @name GetUserClients
   * @summary 사용자 클라이언트 조회
   * @request GET:/api/clients
   * @secure
   */
  getUserClients = (params: RequestParams = {}) =>
    this.http.request<ClientResponse[], Record<string, string>>({
      path: `/api/clients`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 추가 API
   *
   * @tags Client
   * @name SaveClient
   * @summary 클라이언트 추가
   * @request POST:/api/clients
   * @secure
   */
  saveClient = (data: SaveClientRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, Record<string, string>>({
      path: `/api/clients`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트 조회 API
   *
   * @tags Client
   * @name GetClientById
   * @summary 클라이언트 조회
   * @request GET:/api/clients/{clientId}
   * @secure
   */
  getClientById = (clientId: number, params: RequestParams = {}) =>
    this.http.request<ClientResponse, Record<string, string>>({
      path: `/api/clients/${clientId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 삭제 API
   *
   * @tags Client
   * @name DeleteClient
   * @summary 클라이언트 삭제
   * @request DELETE:/api/clients/{clientId}
   * @secure
   */
  deleteClient = (clientId: number, params: RequestParams = {}) =>
    this.http.request<void, Record<string, string>>({
      path: `/api/clients/${clientId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 수정 API
   *
   * @tags Client
   * @name UpdateClient
   * @summary 클라이언트 수정
   * @request PATCH:/api/clients/{clientId}
   * @secure
   */
  updateClient = (clientId: number, data: UpdateClientRequest, params: RequestParams = {}) =>
    this.http.request<void, Record<string, string>>({
      path: `/api/clients/${clientId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트 영업 시작 API (시작 클라이언트 외 모든 영업 종료)
   *
   * @tags Client
   * @name ClientOpen
   * @summary 클라이언트 영업 시작
   * @request PATCH:/api/clients/{clientId}/open
   * @secure
   */
  clientOpen = (clientId: number, params: RequestParams = {}) =>
    this.http.request<void, Record<string, string>>({
      path: `/api/clients/${clientId}/open`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 영업 종료
   *
   * @tags Client
   * @name ClientClose
   * @summary 클라이언트 영업 종료
   * @request PATCH:/api/clients/{clientId}/close
   * @secure
   */
  clientClose = (clientId: number, params: RequestParams = {}) =>
    this.http.request<void, Record<string, string>>({
      path: `/api/clients/${clientId}/close`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 주문 조회 API
   *
   * @tags Client
   * @name GetClientOrders
   * @summary 클라이언트 주문 리스트 조회
   * @request GET:/api/clients/{clientId}/orders
   * @secure
   */
  getClientOrders = (
    clientId: number,
    query: {
      /**
       * @format int64
       * @min 0
       */
      offset: number;
      /** @format int64 */
      limit: number;
      status?: OrderStatus;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<ClientOrderResponse, Record<string, string>>({
      path: `/api/clients/${clientId}/orders`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}

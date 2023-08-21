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

import { ClientResponse, SaveClientRequest, SaveResponse, UpdateClientRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

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
    this.http.request<ClientResponse[], any>({
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
    this.http.request<SaveResponse, any>({
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
   * @name GetClient
   * @summary 클라이언트 조회
   * @request GET:/api/clients/{clientId}
   * @secure
   */
  getClient = (clientId: number, params: RequestParams = {}) =>
    this.http.request<ClientResponse, any>({
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
    this.http.request<void, any>({
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
    this.http.request<void, any>({
      path: `/api/clients/${clientId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

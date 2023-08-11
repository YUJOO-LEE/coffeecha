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
   * @description 클라이언트 조회 API
   *
   * @tags Client
   * @name GetClient
   * @summary 클라이언트 조회
   * @request GET:/clients
   */
  getClient = (params: RequestParams = {}) =>
    this.http.request<ClientResponse[], any>({
      path: `/clients`,
      method: "GET",
      ...params,
    });
  /**
   * @description 클라이언트 추가 API
   *
   * @tags Client
   * @name SaveClient
   * @summary 클라이언트 추가
   * @request POST:/clients
   */
  saveClient = (data: SaveClientRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, any>({
      path: `/clients`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트 삭제 API
   *
   * @tags Client
   * @name DeleteClient
   * @summary 클라이언트 삭제
   * @request DELETE:/clients/{clientId}
   */
  deleteClient = (clientId: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/clients/${clientId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 클라이언트 수정 API
   *
   * @tags Client
   * @name UpdateClient
   * @summary 클라이언트 수정
   * @request PATCH:/clients/{clientId}
   */
  updateClient = (clientId: number, data: UpdateClientRequest, params: RequestParams = {}) =>
    this.http.request<UpdateClientRequest, any>({
      path: `/clients/${clientId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

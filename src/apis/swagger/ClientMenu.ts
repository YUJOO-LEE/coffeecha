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

import { SaveClientMenuRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ClientMenu<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 클라이언트 메뉴 추가 API
   *
   * @tags ClientMenu
   * @name SaveClientMenus
   * @summary 클라이언트 메뉴 추가
   * @request POST:/api/client-menus/clients/{clientId}
   * @secure
   */
  saveClientMenus = (clientId: number, data: SaveClientMenuRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/client-menus/clients/${clientId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

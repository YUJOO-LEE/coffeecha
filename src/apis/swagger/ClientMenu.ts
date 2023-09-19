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

import { ClientMenuResponse, SaveClientMenuRequest, UpdateClientMenuRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ClientMenu<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 클라이언트 메뉴 조회 API
   *
   * @tags ClientMenu
   * @name GetClientMenuAll
   * @summary 클라이언트 메뉴 전체 조회
   * @request GET:/api/client-menus/clients/{clientId}
   * @secure
   */
  getClientMenuAll = (clientId: number, params: RequestParams = {}) =>
    this.http.request<ClientMenuResponse[], any>({
      path: `/api/client-menus/clients/${clientId}`,
      method: "GET",
      secure: true,
      ...params,
    });
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
  /**
   * @description 클라이언트 메뉴 삭제 API
   *
   * @tags ClientMenu
   * @name DeleteClientMenus
   * @summary 클라이언트 메뉴 삭제
   * @request DELETE:/api/client-menus/{clientMenuId}
   * @secure
   */
  deleteClientMenus = (clientMenuId: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/client-menus/${clientMenuId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 메뉴 수정 API (재고 수량, 판매량)
   *
   * @tags ClientMenu
   * @name UpdateClientMenu
   * @summary 클라이언트 메뉴 수정
   * @request PATCH:/api/client-menus/{clientMenuId}
   * @secure
   */
  updateClientMenu = (clientMenuId: number, data: UpdateClientMenuRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/client-menus/${clientMenuId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

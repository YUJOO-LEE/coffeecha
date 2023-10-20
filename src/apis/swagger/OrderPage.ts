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

import { CategoryResponse, ClientMenuResponse, ClientResponse, OrderRequest, OrderResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class OrderPage<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 고객 주문 API
   *
   * @tags OrderPage
   * @name CustomerOrder
   * @summary 고객 주문
   * @request POST:/order-api/order/{clientKey}
   * @secure
   */
  customerOrder = (clientKey: string, data: OrderRequest, params: RequestParams = {}) =>
    this.http.request<OrderResponse, any>({
      path: `/order-api/order/${clientKey}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 클라이언트 정보 조회
   *
   * @tags OrderPage
   * @name GetClientByKey
   * @summary 클라이언트 정보 조회
   * @request GET:/order-api/clients/{clientKey}
   * @secure
   */
  getClientByKey = (clientKey: string, params: RequestParams = {}) =>
    this.http.request<ClientResponse, any>({
      path: `/order-api/clients/${clientKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 클라이언트 메뉴 조회
   *
   * @tags OrderPage
   * @name GetOpenClientAllMenus
   * @summary 클라이언트 메뉴 조회
   * @request GET:/order-api/client-menus/clients/{clientKey}
   * @secure
   */
  getOpenClientAllMenus = (clientKey: string, params: RequestParams = {}) =>
    this.http.request<ClientMenuResponse[], any>({
      path: `/order-api/client-menus/clients/${clientKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 카테고리 조회
   *
   * @tags OrderPage
   * @name AllCategories
   * @summary 카테고리 조회
   * @request GET:/order-api/categories
   * @secure
   */
  allCategories = (params: RequestParams = {}) =>
    this.http.request<CategoryResponse[], any>({
      path: `/order-api/categories`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}

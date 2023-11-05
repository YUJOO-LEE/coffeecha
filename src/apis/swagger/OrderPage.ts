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
  CategoryResponse,
  ClientMenuResponse,
  GuestOrderResponse,
  OrderClientResponse,
  OrderDetailResponse,
  OrderRequest,
  OrderResponse,
} from "./data-contracts";
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
   * @request POST:/order-api/orders/{clientKey}
   * @secure
   */
  customerOrder = (clientKey: string, data: OrderRequest, params: RequestParams = {}) =>
    this.http.request<OrderResponse, any>({
      path: `/order-api/orders/${clientKey}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 주문 정보 조회(주문키)
   *
   * @tags OrderPage
   * @name GuestOrderDetail
   * @summary 주문 상세 조회
   * @request GET:/order-api/orders/{orderKey}
   * @secure
   */
  guestOrderDetail = (orderKey: string, params: RequestParams = {}) =>
    this.http.request<OrderDetailResponse, any>({
      path: `/order-api/orders/${orderKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 게스트 주문 전제 조회(이름, 폰번호)
   *
   * @tags OrderPage
   * @name GuestAllOrders
   * @summary 게스트 주문 전체 조회
   * @request GET:/order-api/orders/guests
   * @secure
   */
  guestAllOrders = (
    query: {
      name: string;
      phone: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<GuestOrderResponse[], any>({
      path: `/order-api/orders/guests`,
      method: "GET",
      query: query,
      secure: true,
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
    this.http.request<OrderClientResponse, any>({
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
   * @name OrderAllCategories
   * @summary 카테고리 조회
   * @request GET:/order-api/categories/{clientKey}
   * @secure
   */
  orderAllCategories = (clientKey: string, params: RequestParams = {}) =>
    this.http.request<CategoryResponse[], any>({
      path: `/order-api/categories/${clientKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
}

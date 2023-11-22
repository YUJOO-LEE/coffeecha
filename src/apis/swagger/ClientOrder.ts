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

import { UpdateOrderStatusRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ClientOrder<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 주문 상태 변경 API
   *
   * @tags ClientOrder
   * @name UpdateOrderStatus
   * @summary 주문 상태 변경
   * @request PATCH:/api/orders/status
   * @secure
   */
  updateOrderStatus = (data: UpdateOrderStatusRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/orders/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

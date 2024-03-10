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

import { SseEmitter } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class SseController<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags sse-controller
   * @name SseOpenConnect
   * @request GET:/sse/open/connect
   * @secure
   */
  sseOpenConnect = (
    query: {
      /** @format int64 */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<SseEmitter, Record<string, string>>({
      path: `/sse/open/connect`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}

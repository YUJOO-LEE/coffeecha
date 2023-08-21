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

import { TokenInfo, TokenRequest } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class AuthToken<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Auth Token
   * @name Token
   * @request POST:/api/auth/token
   * @secure
   */
  token = (
    query: {
      request: TokenRequest;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<TokenInfo, any>({
      path: `/api/auth/token`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
}

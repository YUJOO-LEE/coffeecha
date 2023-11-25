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

import { UpdateUserRequest, UserRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags User
   * @name SaveUser
   * @request POST:/api/user
   * @secure
   */
  saveUser = (data: UserRequest, params: RequestParams = {}) =>
    this.http.request<number, any>({
      path: `/api/user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자 이름, 번호 변경
   *
   * @tags User
   * @name UpdateUser
   * @summary 사용자 정보 변경
   * @request PATCH:/api/users
   * @secure
   */
  updateUser = (data: UpdateUserRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/users`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

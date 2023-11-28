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

import { UpdateUserPasswordRequest, UpdateUserRequest, UserRequest, UserResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 사용자 이름, 번호
   *
   * @tags User
   * @name GetUser
   * @summary 사용자 정보 조회
   * @request GET:/api/users
   * @secure
   */
  getUser = (params: RequestParams = {}) =>
    this.http.request<UserResponse, any>({
      path: `/api/users`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name SaveUser
   * @request POST:/api/users
   * @secure
   */
  saveUser = (data: UserRequest, params: RequestParams = {}) =>
    this.http.request<number, any>({
      path: `/api/users`,
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
  /**
   * @description 사용자 비밀번호 변경
   *
   * @tags User
   * @name UpdateUserPassword
   * @summary 사용자 비밀번호 변경
   * @request PATCH:/api/users/password
   * @secure
   */
  updateUserPassword = (data: UpdateUserPasswordRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/users/password`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

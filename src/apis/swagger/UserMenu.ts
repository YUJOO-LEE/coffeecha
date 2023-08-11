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

import { CreateUserMenuRequest, SaveResponse, UpdateUserMenuRequest, UserMenuResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class UserMenu<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 사용자 메뉴 전체 조회
   *
   * @tags UserMenu
   * @name AllMenu
   * @summary 사용자 메뉴 조회
   * @request GET:/user-menus
   */
  allMenu = (params: RequestParams = {}) =>
    this.http.request<UserMenuResponse[], any>({
      path: `/user-menus`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 사용자 메뉴 추가 API
   *
   * @tags UserMenu
   * @name SaveUser1
   * @summary 사용자 메뉴 추가
   * @request POST:/user-menus
   */
  saveUser1 = (data: CreateUserMenuRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, any>({
      path: `/user-menus`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자 메뉴 삭제 API
   *
   * @tags UserMenu
   * @name DeleteUserMenu
   * @summary 사용자 메뉴 삭제
   * @request DELETE:/user-menus/{id}
   */
  deleteUserMenu = (id: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/user-menus/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 사용자 메뉴 수정 API
   *
   * @tags UserMenu
   * @name UpdateUserMenu
   * @summary 사용자 메뉴 수정
   * @request PATCH:/user-menus/{id}
   */
  updateUserMenu = (id: number, data: UpdateUserMenuRequest, params: RequestParams = {}) =>
    this.http.request<UpdateUserMenuRequest, any>({
      path: `/user-menus/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

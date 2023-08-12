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
   * @description 사용자 메뉴 추가 API
   *
   * @tags UserMenu
   * @name SaveUser1
   * @summary 사용자 메뉴 추가
   * @request POST:/api/menus
   */
  saveUser1 = (data: CreateUserMenuRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, any>({
      path: `/api/menus`,
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
   * @request DELETE:/api/menus/{menuId}
   */
  deleteUserMenu = (menuId: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menus/${menuId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description 사용자 메뉴 수정 API
   *
   * @tags UserMenu
   * @name UpdateUserMenu
   * @summary 사용자 메뉴 수정
   * @request PATCH:/api/menus/{menuId}
   */
  updateUserMenu = (menuId: number, data: UpdateUserMenuRequest, params: RequestParams = {}) =>
    this.http.request<UpdateUserMenuRequest, any>({
      path: `/api/menus/${menuId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자 메뉴 전체 조회
   *
   * @tags UserMenu
   * @name AllMenu
   * @summary 사용자 메뉴 조회
   * @request GET:/api/menus/users/{userId}
   */
  allMenu = (userId: number, params: RequestParams = {}) =>
    this.http.request<UserMenuResponse[], any>({
      path: `/api/menus/users/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}

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
  CreateMenuRequest,
  MenuOptionLinksRequest,
  MenuResponse,
  SaveResponse,
  UpdateMenuRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Menu<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 메뉴 전체 조회
   *
   * @tags Menu
   * @name AllMenu
   * @summary 메뉴 조회
   * @request GET:/api/menus
   * @secure
   */
  allMenu = (params: RequestParams = {}) =>
    this.http.request<MenuResponse[], any>({
      path: `/api/menus`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 메뉴 추가 API
   *
   * @tags Menu
   * @name SaveUserMenu
   * @summary 메뉴 추가
   * @request POST:/api/menus
   * @secure
   */
  saveUserMenu = (data: CreateMenuRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, any>({
      path: `/api/menus`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴와 메뉴 옵션 연결
   *
   * @tags Menu
   * @name MenuOptionLinks
   * @summary 메뉴 옵션 연결
   * @request POST:/api/menus/{menuId}/menu-option-links
   * @secure
   */
  menuOptionLinks = (menuId: number, data: MenuOptionLinksRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menus/${menuId}/menu-option-links`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 삭제 API
   *
   * @tags Menu
   * @name DeleteUserMenu
   * @summary 메뉴 삭제
   * @request DELETE:/api/menus/{menuId}
   * @secure
   */
  deleteUserMenu = (menuId: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menus/${menuId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 메뉴 수정 API
   *
   * @tags Menu
   * @name UpdateUserMenu
   * @summary 메뉴 수정
   * @request PATCH:/api/menus/{menuId}
   * @secure
   */
  updateUserMenu = (menuId: number, data: UpdateMenuRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menus/${menuId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

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

import { MenuOptionResponse, SaveMenuOptionRequest, SaveResponse, UpdateMenuOptionRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MenuOption<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 사용자 메뉴 옵션 전체 조회
   *
   * @tags MenuOption
   * @name GetMenuOption
   * @summary 사용자 메뉴 옵션 조회
   * @request GET:/api/menu-options
   * @secure
   */
  getMenuOption = (params: RequestParams = {}) =>
    this.http.request<MenuOptionResponse[], any>({
      path: `/api/menu-options`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자 메뉴 옵션 추가
   *
   * @tags MenuOption
   * @name SaveMenuOption
   * @summary 사용자 메뉴 옵션 추가
   * @request POST:/api/menu-options
   * @secure
   */
  saveMenuOption = (data: SaveMenuOptionRequest, params: RequestParams = {}) =>
    this.http.request<SaveResponse, any>({
      path: `/api/menu-options`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자 메뉴 옵션 삭제
   *
   * @tags MenuOption
   * @name DeleteMenuOption
   * @summary 사용자 메뉴 옵션 삭제
   * @request DELETE:/api/menu-options/{menuOptionId}
   * @secure
   */
  deleteMenuOption = (menuOptionId: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menu-options/${menuOptionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자 메뉴 옵션 수정
   *
   * @tags MenuOption
   * @name UpdateMenuOption
   * @summary 사용자 메뉴 옵션 수정
   * @request PATCH:/api/menu-options/{menuOptionId}
   * @secure
   */
  updateMenuOption = (menuOptionId: number, data: UpdateMenuOptionRequest, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/menu-options/${menuOptionId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

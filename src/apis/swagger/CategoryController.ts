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

import { CategoryRequest, CategoryResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CategoryController<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags category-controller
   * @name SaveCategory
   * @request POST:/api/category
   * @secure
   */
  saveCategory = (data: CategoryRequest, params: RequestParams = {}) =>
    this.http.request<number, Record<string, string>>({
      path: `/api/category`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name AllCategories
   * @request GET:/api/categories
   * @secure
   */
  allCategories = (params: RequestParams = {}) =>
    this.http.request<CategoryResponse[], Record<string, string>>({
      path: `/api/categories`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}

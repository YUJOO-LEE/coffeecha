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
   * @request POST:/category
   */
  saveCategory = (data: CategoryRequest, params: RequestParams = {}) =>
    this.http.request<number, any>({
      path: `/category`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags category-controller
   * @name AllCategories
   * @request GET:/categories
   */
  allCategories = (params: RequestParams = {}) =>
    this.http.request<CategoryResponse[], any>({
      path: `/categories`,
      method: "GET",
      format: "json",
      ...params,
    });
}

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

import { ImageUploadUrlResponse } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Image<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description AWS S3 업로드 (POST 호출 할 것)
   *
   * @tags Image
   * @name AwsS3ImageUploadUrl
   * @summary AWS upload 경로
   * @request GET:/api/image-upload-path
   * @secure
   */
  awsS3ImageUploadUrl = (
    query: {
      file: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<ImageUploadUrlResponse, any>({
      path: `/api/image-upload-path`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}

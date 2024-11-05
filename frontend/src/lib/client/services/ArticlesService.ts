/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { articleIn } from '../models/articleIn';
import type { articleOut } from '../models/articleOut';
import type { articleUpdate } from '../models/articleUpdate';
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ArticlesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list articles
	 * @param page Page number for pagination
	 * @returns articleOut successful
	 * @throws ApiError
	 */
	public getV1Articles(page?: number): CancelablePromise<Array<articleOut>> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/articles',
			query: {
				page: page
			}
		});
	}
	/**
	 * create article
	 * @param requestBody
	 * @returns articleOut successful
	 * @throws ApiError
	 */
	public postV1Articles(requestBody?: articleIn): CancelablePromise<articleOut> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/articles',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show article
	 * @param id id
	 * @returns articleOut successful
	 * @throws ApiError
	 */
	public getV1Articles1(id: number): CancelablePromise<articleOut> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/articles/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update article
	 * @param id id
	 * @param requestBody
	 * @returns articleOut successful
	 * @throws ApiError
	 */
	public putV1Articles(id: number, requestBody?: articleUpdate): CancelablePromise<articleOut> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/articles/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * delete article
	 * @param id id
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Articles(id: number, requestBody?: createUpdateBaseModel): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/articles/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
}

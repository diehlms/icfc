/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { chartOut } from '../models/chartOut';
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChartsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list charts
	 * @returns chartOut successful
	 * @throws ApiError
	 */
	public getV1Charts(): CancelablePromise<Array<chartOut>> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/charts'
		});
	}
	/**
	 * create chart
	 * @returns chartOut successful
	 * @throws ApiError
	 */
	public postV1Charts(): CancelablePromise<chartOut> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/charts'
		});
	}
	/**
	 * show chart
	 * @param id id
	 * @returns chartOut successful
	 * @throws ApiError
	 */
	public getV1Charts1(id: number): CancelablePromise<chartOut> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/charts/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete chart
	 * @param id id
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Charts(id: number, requestBody?: createUpdateBaseModel): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/charts/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
}

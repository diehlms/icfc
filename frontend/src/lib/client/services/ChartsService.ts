/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChartsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list charts
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Charts(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/charts'
		});
	}
	/**
	 * create chart
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Charts(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/charts'
		});
	}
	/**
	 * show chart
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Charts1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/charts/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update chart
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1Charts(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/charts/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update chart
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1Charts(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/charts/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete chart
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Charts(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/charts/{id}',
			path: {
				id: id
			}
		});
	}
}

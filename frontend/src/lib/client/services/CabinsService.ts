/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { cabinIn } from '../models/cabinIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CabinsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list cabins
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Cabins(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/cabins'
		});
	}
	/**
	 * create cabin
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Cabins(requestBody?: cabinIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/cabins',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show cabin
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Cabins1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/cabins/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update cabin
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1Cabins(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/cabins/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update cabin
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1Cabins(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/cabins/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete cabin
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Cabins(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/cabins/{id}',
			path: {
				id: id
			}
		});
	}
}

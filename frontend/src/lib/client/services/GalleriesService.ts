/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GalleriesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list galleries
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Galleries(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/galleries'
		});
	}
	/**
	 * create gallery
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Galleries(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/galleries'
		});
	}
	/**
	 * show gallery
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Galleries1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/galleries/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update gallery
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1Galleries(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/galleries/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update gallery
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1Galleries(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/galleries/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete gallery
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Galleries(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/galleries/{id}',
			path: {
				id: id
			}
		});
	}
}

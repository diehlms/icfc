/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { galleryOut } from '../models/galleryOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GalleriesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list galleries
	 * @returns galleryOut successful
	 * @throws ApiError
	 */
	public getV1Galleries(): CancelablePromise<Array<galleryOut>> {
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
	 * delete gallery
	 * @param id id
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Galleries(
		id: number,
		requestBody?: createUpdateBaseModel
	): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/galleries/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
}

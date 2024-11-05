/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { documentOut } from '../models/documentOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DocumentsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list documents
	 * @returns documentOut successful
	 * @throws ApiError
	 */
	public getV1Documents(): CancelablePromise<Array<documentOut>> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/documents'
		});
	}
	/**
	 * create document
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Documents(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/documents'
		});
	}
	/**
	 * delete document
	 * @param id id
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Documents(
		id: number,
		requestBody?: createUpdateBaseModel
	): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/documents/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
}

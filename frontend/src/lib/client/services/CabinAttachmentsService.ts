/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { cabinAttachmentIn } from '../models/cabinAttachmentIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CabinAttachmentsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list cabin_attachments
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1CabinAttachments(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/cabin_attachments'
		});
	}
	/**
	 * create cabin_attachment
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1CabinAttachments(requestBody?: cabinAttachmentIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/cabin_attachments',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show cabin_attachment
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1CabinAttachments1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/cabin_attachments/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete cabin_attachment
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1CabinAttachments(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/cabin_attachments/{id}',
			path: {
				id: id
			}
		});
	}
}

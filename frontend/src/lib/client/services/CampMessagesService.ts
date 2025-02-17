/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { campMessageIn } from '../models/campMessageIn';
import type { campMessageOut } from '../models/campMessageOut';
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CampMessagesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list camp_messages
	 * @returns campMessageOut successful
	 * @throws ApiError
	 */
	public getV1CampMessages(): CancelablePromise<Array<campMessageOut>> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/camp_messages'
		});
	}
	/**
	 * create camp message
	 * @param requestBody
	 * @returns campMessageOut successful
	 * @throws ApiError
	 */
	public postV1CampMessages(requestBody?: campMessageIn): CancelablePromise<campMessageOut> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/camp_messages',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * delete camp message
	 * @param id id
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1CampMessages(
		id: number,
		requestBody?: createUpdateBaseModel
	): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/camp_messages/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
}

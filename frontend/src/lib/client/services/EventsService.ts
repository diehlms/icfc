/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { eventIn } from '../models/eventIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EventsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list events
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Events(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/events'
		});
	}
	/**
	 * create event
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Events(requestBody?: eventIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/events',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show event
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Events1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/events/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update event
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1Events(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/events/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update event
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1Events(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/events/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete event
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Events(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/events/{id}',
			path: {
				id: id
			}
		});
	}
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EntryService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list entries
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Entry(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry'
		});
	}
	/**
	 * create entry
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Entry(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/entry'
		});
	}
	/**
	 * show entry
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Entry1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update entry
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1Entry(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/entry/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update entry
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1Entry(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/entry/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete entry
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Entry(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/entry/{id}',
			path: {
				id: id
			}
		});
	}
}

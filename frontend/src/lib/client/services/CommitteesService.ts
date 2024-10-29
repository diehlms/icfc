/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CommitteesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list committees
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1Committees(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/committees'
		});
	}
	/**
	 * create committee
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Committees(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/committees'
		});
	}
	/**
	 * delete committee
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Committees(id: number): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/committees/{id}',
			path: {
				id: id
			}
		});
	}
}

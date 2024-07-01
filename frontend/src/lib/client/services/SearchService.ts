/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SearchService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * create search
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Search(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/search'
		});
	}
}

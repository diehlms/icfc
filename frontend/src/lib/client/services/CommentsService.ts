/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { commentIn } from '../models/commentIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CommentsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * create comment
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1Comments(requestBody?: commentIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/comments',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * delete comment
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1Comments(id: number): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/comments/{id}',
			path: {
				id: id
			}
		});
	}
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FamilyTreesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list family_trees
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1FamilyTrees(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/family_trees'
		});
	}
	/**
	 * create family_tree
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1FamilyTrees(requestBody?: any): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/family_trees',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show family_tree
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1FamilyTrees1(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/family_trees/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update family_tree
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1FamilyTrees(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/family_trees/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * update family_tree
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1FamilyTrees(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/family_trees/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * delete family_tree
	 * @param id id
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1FamilyTrees(id: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/family_trees/{id}',
			path: {
				id: id
			}
		});
	}
}

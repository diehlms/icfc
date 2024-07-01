/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { familyMemberIn } from '../models/familyMemberIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FamilyMembersService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * list family_members
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1FamilyMembers(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/family_members'
		});
	}
	/**
	 * create family_member
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1FamilyMembers(requestBody?: familyMemberIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/family_members',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * update family_member
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1FamilyMembers(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/v1/family_members/{id}'
		});
	}
	/**
	 * update family_member
	 * @returns any successful
	 * @throws ApiError
	 */
	public putV1FamilyMembers(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/family_members/{id}'
		});
	}
	/**
	 * delete family_member
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1FamilyMembers(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/family_members/{id}'
		});
	}
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { familyMemberIn } from '../models/familyMemberIn';
import type { relationshipArray } from '../models/relationshipArray';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FamilyMembersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * create family_member
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public postV1FamilyMembers(
        requestBody?: familyMemberIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/family_members',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * update family_member
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public putV1FamilyMembers(
        requestBody?: relationshipArray,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/family_members',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete family_member
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1FamilyMembers(
        id: number,
        requestBody?: createUpdateBaseModel,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/family_members/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

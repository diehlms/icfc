/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { userUpdate } from '../models/userUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list users
     * @returns any successful
     * @throws ApiError
     */
    public getV1Users(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users',
        });
    }
    /**
     * show user
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public getV1Users1(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update user
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public putV1Users(
        id: number,
        requestBody?: userUpdate,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete user
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Users(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * create user
     * @returns any successful
     * @throws ApiError
     */
    public postV1Users(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
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
        id: string,
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
     * @returns any successful
     * @throws ApiError
     */
    public patchV1Users(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * delete user
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Users(
        id: string,
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

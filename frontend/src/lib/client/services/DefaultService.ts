/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * delete password_reset
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1PasswordResets(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/password_resets/{id}',
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
    public putV1Users(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
}

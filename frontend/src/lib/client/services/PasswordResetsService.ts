/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PasswordResetsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list password_resets
     * @returns any successful
     * @throws ApiError
     */
    public getV1PasswordResets(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/password_resets',
        });
    }
    /**
     * create password_reset
     * @returns any successful
     * @throws ApiError
     */
    public postV1PasswordResets(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/password_resets',
        });
    }
    /**
     * show password_reset
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public getV1PasswordResets1(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/password_resets/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update password_reset
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public patchV1PasswordResets(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/password_resets/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update password_reset
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public putV1PasswordResets(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/password_resets/{id}',
            path: {
                'id': id,
            },
        });
    }
}

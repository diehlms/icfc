/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { rideshareIn } from '../models/rideshareIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RidesharesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list rideshares
     * @returns any successful
     * @throws ApiError
     */
    public getV1Rideshares(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/rideshares',
        });
    }
    /**
     * create rideshare
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public postV1Rideshares(
        requestBody?: rideshareIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/rideshares',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * show rideshare
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public getV1Rideshares1(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/rideshares/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update rideshare
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public putV1Rideshares(
        id: string,
        requestBody?: rideshareIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/rideshares/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete rideshare
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Rideshares(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/rideshares/{id}',
            path: {
                'id': id,
            },
        });
    }
}

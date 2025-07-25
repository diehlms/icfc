/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { cabinIn } from '../models/cabinIn';
import type { cabinOut } from '../models/cabinOut';
import type { cabinUpdate } from '../models/cabinUpdate';
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CabinsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list cabins
     * @returns cabinOut successful
     * @throws ApiError
     */
    public getV1Cabins(): CancelablePromise<Array<cabinOut>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/cabins',
        });
    }
    /**
     * create cabin
     * @param requestBody
     * @returns cabinOut successful
     * @throws ApiError
     */
    public postV1Cabins(
        requestBody?: cabinIn,
    ): CancelablePromise<cabinOut> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cabins',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * show cabin
     * @param id id
     * @returns cabinOut successful
     * @throws ApiError
     */
    public getV1Cabins1(
        id: number,
    ): CancelablePromise<cabinOut> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/cabins/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update cabin
     * @param id id
     * @param requestBody
     * @returns cabinOut successful
     * @throws ApiError
     */
    public putV1Cabins(
        id: number,
        requestBody?: cabinUpdate,
    ): CancelablePromise<cabinOut> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/cabins/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete cabin
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Cabins(
        id: number,
        requestBody?: createUpdateBaseModel,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/cabins/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

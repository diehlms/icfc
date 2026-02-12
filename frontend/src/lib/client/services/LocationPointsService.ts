/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { locationPointIn } from '../models/locationPointIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LocationPointsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list location_points
     * @returns any successful
     * @throws ApiError
     */
    public getV1LocationPoints(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/location_points',
        });
    }
    /**
     * create location_point
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public postV1LocationPoints(
        requestBody?: locationPointIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/location_points',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete location_point
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1LocationPoints(
        id: number,
        requestBody?: createUpdateBaseModel,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/location_points/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

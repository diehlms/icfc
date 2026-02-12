/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { eventIn } from '../models/eventIn';
import type { eventOut } from '../models/eventOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EventsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list events
     * @returns eventOut successful
     * @throws ApiError
     */
    public getV1Events(): CancelablePromise<Array<eventOut>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/events',
        });
    }
    /**
     * create event
     * @param requestBody
     * @returns eventOut successful
     * @throws ApiError
     */
    public postV1Events(
        requestBody?: eventIn,
    ): CancelablePromise<eventOut> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * show event
     * @param id id
     * @returns eventOut successful
     * @throws ApiError
     */
    public getV1Events1(
        id: number,
    ): CancelablePromise<eventOut> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/events/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update event
     * @param id id
     * @param requestBody
     * @returns eventOut successful
     * @throws ApiError
     */
    public putV1Events(
        id: number,
        requestBody?: eventIn,
    ): CancelablePromise<eventOut> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/events/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete event
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Events(
        id: number,
        requestBody?: createUpdateBaseModel,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/events/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

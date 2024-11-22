/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LogsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * get logs
     * @returns any successful
     * @throws ApiError
     */
    public getV1Logs(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/logs',
        });
    }
}

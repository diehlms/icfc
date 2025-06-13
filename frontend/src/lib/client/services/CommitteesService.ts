/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { committeeOut } from '../models/committeeOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CommitteesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list committees
     * @returns committeeOut successful
     * @throws ApiError
     */
    public getV1Committees(): CancelablePromise<committeeOut> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/committees',
        });
    }
}

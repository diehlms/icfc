/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { searchIn } from '../models/searchIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SearchService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * create search
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public postV1Search(
        requestBody?: searchIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

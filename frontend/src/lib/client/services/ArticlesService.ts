/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { articleIn } from '../models/articleIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ArticlesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * list articles
     * @returns any successful
     * @throws ApiError
     */
    public getV1Articles(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/articles',
        });
    }
    /**
     * create article
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public postV1Articles(
        requestBody?: articleIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/articles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * show article
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public getV1Articles1(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/articles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update article
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public putV1Articles(
        id: string,
        requestBody?: articleIn,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/articles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete article
     * @param id id
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1Articles(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/articles/{id}',
            path: {
                'id': id,
            },
        });
    }
}

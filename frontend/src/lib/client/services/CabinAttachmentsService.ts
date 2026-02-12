/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from '../models/createUpdateBaseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CabinAttachmentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * create cabin_attachment
     * @returns any successful
     * @throws ApiError
     */
    public postV1CabinAttachments(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cabin_attachments',
        });
    }
    /**
     * delete cabin_attachment
     * @param id id
     * @param requestBody
     * @returns any successful
     * @throws ApiError
     */
    public deleteV1CabinAttachments(
        id: number,
        requestBody?: createUpdateBaseModel,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/cabin_attachments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

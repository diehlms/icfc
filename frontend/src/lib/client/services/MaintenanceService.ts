/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MaintenanceService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * toggle maintenance_mode
     * @returns any successful
     * @throws ApiError
     */
    public postV1ToggleMaintenance(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/toggle_maintenance',
        });
    }
}

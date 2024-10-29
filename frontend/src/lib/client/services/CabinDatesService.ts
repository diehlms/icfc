/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { cabinDateIn } from '../models/cabinDateIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CabinDatesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * create cabin_date
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1CabinDates(requestBody?: cabinDateIn): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/cabin_dates',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * delete cabin_date
	 * @returns any successful
	 * @throws ApiError
	 */
	public deleteV1CabinDates(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/v1/cabin_dates/{id}'
		});
	}
}

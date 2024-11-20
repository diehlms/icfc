/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EntryService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * get initial payload
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1EntryInitialPayload(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry/initial_payload'
		});
	}
	/**
	 * campers
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1EntryCampers(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry/campers'
		});
	}
	/**
	 * recent articles
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1EntryRecentArticles(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry/recent_articles'
		});
	}
	/**
	 * this weeks events
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1EntryThisWeeksEvents(): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/entry/this_weeks_events'
		});
	}
}

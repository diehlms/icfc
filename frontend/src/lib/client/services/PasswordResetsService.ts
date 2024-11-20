/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PasswordResetsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * create password_reset
	 * @param email
	 * @returns any successful
	 * @throws ApiError
	 */
	public postV1PasswordResets(email?: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/v1/password_resets',
			query: {
				email: email
			}
		});
	}
	/**
	 * update password
	 * @param requestBody
	 * @returns any successful
	 * @throws ApiError
	 */
	public patchV1PasswordResets(requestBody?: any): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/v1/password_resets',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * show password_reset
	 * @param passwordResetToken password_reset_token
	 * @returns any successful
	 * @throws ApiError
	 */
	public getV1PasswordResetsInitResetPassword(passwordResetToken?: string): CancelablePromise<any> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/v1/password_resets/init_reset_password',
			query: {
				password_reset_token: passwordResetToken
			}
		});
	}
}

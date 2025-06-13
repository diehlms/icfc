/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loginPayload } from '../models/loginPayload';
import type { signupPayload } from '../models/signupPayload';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * login authentication
     * login, get new session
     * @param requestBody
     * @returns loginPayload successful
     * @throws ApiError
     */
    public postV1AuthLogin(
        requestBody?: loginPayload,
    ): CancelablePromise<loginPayload> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * signup authentication
     * sign up
     * @param requestBody
     * @returns signupPayload successful
     * @throws ApiError
     */
    public postV1AuthSignup(
        requestBody?: signupPayload,
    ): CancelablePromise<signupPayload> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * confirm email
     * confirm email
     * @param token confirm token
     * @returns any successful
     * @throws ApiError
     */
    public postV1AuthConfirmEmail(
        token: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/confirm_email/{token}',
            path: {
                'token': token,
            },
        });
    }
}

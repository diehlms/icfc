/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { baseModel } from './baseModel';
import type { createUpdateBaseModel } from './createUpdateBaseModel';
export type userIn = (createUpdateBaseModel & baseModel & {
    username?: string;
    phone_number?: string;
    firstname?: string;
    lastname?: string;
    user_id?: number;
});


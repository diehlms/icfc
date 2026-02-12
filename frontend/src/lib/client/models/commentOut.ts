/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { baseModel } from './baseModel';
import type { commentIn } from './commentIn';
export type commentOut = (baseModel & commentIn & {
    id?: number;
    author_email?: string;
    author_username?: string;
});


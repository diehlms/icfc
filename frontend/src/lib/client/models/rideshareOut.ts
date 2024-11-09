/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { rideshareIn } from './rideshareIn';
export type rideshareOut = (rideshareIn & baseModel & {
    id?: number;
    user?: author;
});


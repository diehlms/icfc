/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from './createUpdateBaseModel';
export type familyMemberIn = (createUpdateBaseModel & {
    family_tree_id?: number;
    name?: string;
    relationship?: string;
    parent_ids?: Array<number>;
    date_of_birth?: string;
});


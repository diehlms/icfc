/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from './createUpdateBaseModel';
export type familyMemberIn = Array<
	createUpdateBaseModel & {
		name?: string;
		relationship?: string;
		family_tree_id?: number;
		parent_id?: number;
	}
>;

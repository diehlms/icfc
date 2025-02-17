/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { attachmentBaseModel } from './attachmentBaseModel';
import type { createUpdateBaseModel } from './createUpdateBaseModel';
export type documentIn = createUpdateBaseModel & {
	document_title?: string;
	document_folder?: string;
	document?: attachmentBaseModel;
};

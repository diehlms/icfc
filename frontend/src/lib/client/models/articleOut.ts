/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { articleIn } from './articleIn';
import type { attachmentBaseModel } from './attachmentBaseModel';
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { commentOut } from './commentOut';
export type articleOut = baseModel &
	articleIn & {
		id?: number;
		image?: attachmentBaseModel;
		user?: author;
		comments?: Array<commentOut>;
	};

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { eventIn } from './eventIn';
export type eventOut = baseModel &
	eventIn & {
		id?: number;
		user?: author;
	};

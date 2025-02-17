/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { cabinAttachmentOut } from './cabinAttachmentOut';
import type { cabinDateOut } from './cabinDateOut';
import type { cabinIn } from './cabinIn';
export type cabinOut = baseModel &
	cabinIn & {
		id?: number;
		cabindates?: Array<cabinDateOut>;
		cabin_attachments?: Array<cabinAttachmentOut>;
		user?: author;
	};

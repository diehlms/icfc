/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { attachmentBaseModel } from './attachmentBaseModel';
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { galleryIn } from './galleryIn';
export type galleryOut = galleryIn &
	baseModel & {
		image?: attachmentBaseModel;
		user?: author;
	};

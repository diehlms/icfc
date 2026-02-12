/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { author } from './author';
import type { baseModel } from './baseModel';
import type { familyMemberOut } from './familyMemberOut';
import type { familyTreeIn } from './familyTreeIn';
export type familyTreeOut = (baseModel & familyTreeIn & {
    user?: author;
    family_members?: Array<familyMemberOut>;
});


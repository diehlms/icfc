/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { createUpdateBaseModel } from './createUpdateBaseModel';
export type rideshareIn = (createUpdateBaseModel & {
    user_id?: number;
    number_of_passengers?: number;
    additional_information?: string;
    arriving_at?: string;
    departing_at?: string;
    point_of_arrival_id?: string;
    point_of_departure_id?: string;
    seeking?: boolean;
});


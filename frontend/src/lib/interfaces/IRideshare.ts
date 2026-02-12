import type { rideshareOut } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	seeking: boolean | undefined;
	arrivingAt: string | undefined;
	departingAt: string | undefined;
	numberOfPassengers: number | undefined;
	pointOfDeparture: string | undefined;
	pointOfArrival: string | undefined;

	constructor(public rideshare: rideshareOut) {
		super('Rideshare');
		this.id = this.rideshare.id?.toString() as string;
		this.seeking = this.rideshare.seeking;
		this.arrivingAt = new Date(this.rideshare.arriving_at as string).toLocaleDateString();
		this.departingAt = new Date(this.rideshare.departing_at as string).toLocaleDateString();
		this.numberOfPassengers = this.rideshare.number_of_passengers;
		this.pointOfArrival = this.rideshare.point_of_arrival.location_name;
		this.pointOfDeparture = this.rideshare.point_of_departure.location_name;
	}
}

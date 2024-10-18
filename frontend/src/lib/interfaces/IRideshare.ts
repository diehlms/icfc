import type { rideshareIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	id: number
	seeking: boolean
	arrivingAt: string
	departingAt: string
	numberOfPassengers: number
	pointOfDeparture: string
	pointOfArrival: string
	userId: string

	constructor(public rideshare: rideshareIn) {
		super('Rideshare');
		this.id = this.rideshare.id
		this.seeking = this.rideshare.seeking
		this.arrivingAt = this.rideshare.arriving_at
		this.departingAt = this.rideshare.departing_at
		this.numberOfPassengers = this.rideshare.number_of_passengers
		this.pointOfArrival = this.rideshare.point_of_arrival.location_name
		this.pointOfDeparture = this.rideshare.point_of_departure.location_name
		this.userId = this.rideshare.user_id
	}
}

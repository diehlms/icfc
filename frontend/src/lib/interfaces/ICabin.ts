import type { cabinIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	id: number
	name: string
	bedrooms: number
	dock: boolean
	washerDryer: boolean
	pricePerDay: number
	pricePerWeek: number

	constructor(public cabin: cabinIn) {
		super('Cabin');
		this.id = this.cabin.id
		this.name = this.cabin.name
		this.bedrooms = this.cabin.bedrooms
		this.washerDryer = this.cabin.washerdryer
		this.dock = this.cabin.dock
		this.pricePerDay = `$${this.cabin.price_per_day}`
		this.pricePerWeek = `$${this.cabin.price_per_week}`
	}
}

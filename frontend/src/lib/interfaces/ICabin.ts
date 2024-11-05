import type { cabinOut } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	name: string | undefined;
	bedrooms: number | undefined;
	dock: boolean | undefined;
	washerDryer: boolean | undefined;
	pricePerDay: string | undefined;
	pricePerWeek: string | undefined;

	constructor(public cabin: cabinOut) {
		super('Cabin');
		this.id = this.cabin.id?.toString() as string;
		this.name = this.cabin.name;
		this.bedrooms = this.cabin.bedrooms;
		this.washerDryer = this.cabin.washerdryer;
		this.dock = this.cabin.dock;
		this.pricePerDay = `$${!!this.cabin.price_per_day ? this.cabin.price_per_day : 0}`;
		this.pricePerWeek = `$${!!this.cabin.price_per_week ? this.cabin.price_per_week : 0}`;
	}
}

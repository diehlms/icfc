import type { chartIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	id: number;
	caption: string;
	created_at: string;
	updated_at: string;
	constructor(public chart: chartIn) {
		super('Chart');
		this.id = this.chart.id;
		this.caption = this.chart.caption;
		this.createdAt = new Date(this.chart.created_at).toDateString();
		this.updatedAt = new Date(this.chart.updated_at).toDateString();
	}
}

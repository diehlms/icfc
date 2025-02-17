import type { chartOut } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	caption: string | undefined;
	created_at: string | undefined;
	updated_at: string | undefined;
	constructor(public chart: chartOut) {
		super('Chart');
		this.id = this.chart.id;
		this.caption = this.chart.caption;
		this.createdAt = new Date(this.chart.created_at as string).toDateString();
		this.updatedAt = new Date(this.chart.updated_at as string).toDateString();
	}
}

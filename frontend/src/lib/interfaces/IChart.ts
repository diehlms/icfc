import type { chartIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	id: number
	caption: string;
	created_at: string;
	updated_at: string;
	constructor(public chartIn: chartIn) {
		super('Chart');
		this.id = this.chartIn.id;
		this.caption = this.chartIn.caption;
		this.created_at = this.chartIn.created_at;
		this.updated_at = this.chartIn.updated_at;
	}
}

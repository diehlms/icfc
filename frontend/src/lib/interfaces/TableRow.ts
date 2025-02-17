export class TableRow {
	constructor(public id: number | undefined | string) {}
	[key: string]: any;
	checked = false;
}

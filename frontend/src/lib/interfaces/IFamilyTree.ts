import type { familyTreeOut } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	name: string | undefined;

	constructor(public familyTree: familyTreeOut) {
		super('FamilyTree');
		this.id = this.familyTree.id;
		this.name = this.familyTree.name;
	}
}

import type { familyTreeIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	id: number
	name: string

	constructor(public familyTree: familyTreeIn) {
		super('FamilyTree');
		this.id = this.familyTree.id
		this.name = this.familyTree.name
	}
}

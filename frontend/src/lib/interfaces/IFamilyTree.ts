import type { familyTreeIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	constructor(public familyTreeIn: familyTreeIn) {
		super('FamilyTree');
	}

	name = 'Diehl';
	// name = this.userIn;
	// user_id = this.userIn.id;
	// role = this.userIn.role;
	// email = this.userIn.email;
	// isActive = this.userIn.is_active;
	// hasDataAccess = this.userIn.data_access;
	// apiOnly = this.userIn.api_only;
}

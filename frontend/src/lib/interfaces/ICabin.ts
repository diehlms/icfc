import type { cabinIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	constructor(public cabinIn: cabinIn) {
		super('Cabin');
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

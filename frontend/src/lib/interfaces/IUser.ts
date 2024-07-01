import type { userIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	constructor(public userIn: userIn) {
		super('User');
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

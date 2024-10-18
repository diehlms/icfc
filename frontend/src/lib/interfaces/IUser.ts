import type { userIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	name: string;
	username: string;
	email: string;
	phoneNumber: string;

	constructor(public user: userIn) {
		super('User');
		this.name = `${this.user.firstname} ${this.user.lastname}`;
		this.username = this.user.username;
		this.email = this.user.email;
		this.phoneNumber = this.user.phone_number;
	}
}

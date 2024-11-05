import type { author, userIn } from '$lib/client';
import { TableRow } from './TableRow';

export default class extends TableRow {
	name: string | undefined;
	username: string | undefined;
	email: string | undefined;
	phoneNumber: string | undefined;
	admin: boolean | undefined;
	recently_joined: boolean | undefined;

	constructor(public user: author) {
		super('User');
		this.name = `${this.user.firstname} ${this.user.lastname}`;
		this.username = this.user.username;
		this.email = this.user.email;
		this.phoneNumber = this.user.phone_number;
		this.admin = this.user.admin;
		this.recentlyJoined = this.user['recently_joined?'];
	}
}

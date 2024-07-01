import { type AppClient, type User } from '$lib/client';
import { writable } from 'svelte/store';

export enum ToastTypes {
	success = 'SUCCESS',
	error = 'ERROR'
}

export interface IToastStore {
	toastMessage: string | null;
	isOpen: boolean;
	type: ToastTypes | null;
}

export interface IClientStore {
	authCookie: string | null;
	restClient: AppClient | null;
	apiUrl: string;
	authenticated: boolean;
}

export const toastStore = writable<IToastStore>({
	toastMessage: null,
	isOpen: false,
	type: ToastTypes.success
});

export const clientStore = writable<IClientStore>({
	apiUrl: '',
	authCookie: null,
	restClient: null,
	authenticated: false
});

export const userStore = writable<User>({
	email: '',
	is_active: false,
	full_name: '',
	role: undefined,
	id: undefined,
	is_superuser: false,
	client_id: undefined,
	api_only: false,
	data_access: false
});

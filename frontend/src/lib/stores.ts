import { type AppClient } from '$lib/client';
import { writable } from 'svelte/store';

export enum ToastTypes {
	success = 'SUCCESS',
	error = 'ERROR'
}

export interface IUserStore {
	id: number | null;
	email: string | null;
	admin: boolean | null;
	firstName: string | null;
	lastName: string | null;
}

export interface IToastStore {
	toastMessage: string | null;
	isOpen: boolean;
	type: ToastTypes | null;
}

export interface IClientStore {
	authCookie: string | null | undefined;
	restClient: AppClient | null;
	apiUrl: string;
	authenticated: boolean;
	imageUploadClient: any;
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
	authenticated: false,
	imageUploadClient: null
});

export const userStore = writable<IUserStore>({
	id: null,
	email: null,
	admin: false,
	firstName: null,
	lastName: null
});

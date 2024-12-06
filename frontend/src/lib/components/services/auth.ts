import { AppClient } from '../../../lib/client/AppClient';
import { clientStore, userStore, type IClientStore, type IUserStore } from '$lib/stores';
import { get } from 'svelte/store';
import { ImageUploadClient } from './imageUploadClient';
import { PUBLIC_API_URL } from '$env/static/public';
import { goto } from '$app/navigation';

export default {
	isTokenExpired(token: string): boolean {
		const arrayToken = token.split('.');
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;
	},
	userActionPermitted(entity_user_id: number, user: any): boolean {
		return user && (user.admin || entity_user_id === user.id);
	},
	async updateAuthContext(fallbackToken?: string): Promise<number> {
		const apiUrl = PUBLIC_API_URL;
		let authToken: string | null | undefined = get(clientStore).authCookie;
		let arrayToken: string[] | undefined;
		let tokenPayload: any;

		if (authToken === null) {
			authToken = localStorage.getItem('authToken');
		} else {
			authToken = fallbackToken;
		}

		if (this.isTokenExpired(authToken as string)) {
			localStorage.removeItem('authToken');
			goto('/auth/login');
		}

		arrayToken = authToken?.split('.') as string[];

		if (arrayToken) {
			tokenPayload = JSON.parse(atob(arrayToken[1]));
			userStore.update((store: IUserStore) => {
				return {
					...store,
					id: tokenPayload['user_id'],
					admin: tokenPayload['admin'],
					firstName: tokenPayload['first_name'],
					lastName: tokenPayload['last_name'],
					email: tokenPayload['email']
				};
			});
		}

		clientStore.update((store: IClientStore) => {
			const restClientAuthenticated = new AppClient({
				BASE: apiUrl,
				HEADERS: {
					Authorization: `Bearer ${authToken}`
				}
			});

			const imageUploadClient = new ImageUploadClient(PUBLIC_API_URL, authToken as string);

			return {
				...store,
				authenticated: true,
				authCookie: authToken,
				restClient: restClientAuthenticated,
				imageUploadClient: imageUploadClient
			};
		});

		return 1;
	}
};

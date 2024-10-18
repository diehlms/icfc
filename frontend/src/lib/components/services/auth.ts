import { AppClient } from '../../../lib/client/AppClient';
import { clientStore, userStore, type IClientStore, type IUserStore} from '$lib/stores';
import { get } from 'svelte/store';
import { ImageUploadClient } from './imageUploadClient';

const PUBLIC_API_URL = 'http://localhost:3010/api/';

export default {
	isTokenExpired(token: string) {
		const arrayToken = token.split('.');
		const tokenPayload = JSON.parse(atob(arrayToken[1]));
		return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
	},
	userActionPermitted(entity_user_id: number, user_id: number): boolean {
		return entity_user_id === user_id
	},
	updateAuthContext() {
		const apiUrl = PUBLIC_API_URL;
		let authToken: string | null = get(clientStore).authCookie;
		let arrayToken: string[] | undefined;
		let tokenPayload: any;

		if (authToken === null) {
			authToken = localStorage.getItem('authToken');
			arrayToken = authToken?.split('.') as string[];
		}

		if (arrayToken) {
			tokenPayload = JSON.parse(atob(arrayToken[1]));
		}

		userStore.update((store: IUserStore) => {
			return {
				...store,
				id: tokenPayload['user_id']
			}
		})

		clientStore.update((store: IClientStore) => {
			const restClientAuthenticated = new AppClient({
				BASE: apiUrl,
				HEADERS: {
					Authorization: `Bearer ${authToken}`
				}
			});

			const imageUploadClient = new ImageUploadClient(
				PUBLIC_API_URL, authToken as string
			)

			return {
				...store,
				authenticated: true,
				authCookie: authToken,
				restClient: restClientAuthenticated,
				imageUploadClient: imageUploadClient
			};
		});
	}
};

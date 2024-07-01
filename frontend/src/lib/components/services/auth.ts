// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
// import { setContext as apolloSetContext} from '@apollo/client/link/context';
import { AppClient } from '../../../lib/client/AppClient';
import { clientStore, type IClientStore } from '$lib/stores';
import { get } from 'svelte/store';
// import { PUBLIC_API_URL } from '$env/static/public'

const PUBLIC_API_URL = 'http://localhost:3010/api/';

export default {
	updateAuthContext() {
		const apiUrl = PUBLIC_API_URL;
		let authToken: string | null = get(clientStore).authCookie;

		if (authToken === null) {
			authToken = localStorage.getItem('authToken');
		}

		clientStore.update((store: IClientStore) => {
			const restClientAuthenticated = new AppClient({
				BASE: apiUrl,
				HEADERS: {
					Authorization: `Bearer ${authToken}`
				}
			});

			// const httpLink = createHttpLink({
			//     uri: `${apiUrl}/graphql`,
			// });

			// const authLink = apolloSetContext((_, { headers }) => {
			//     return {
			//         headers: {
			//             ...headers,
			//             'Authorization': `Bearer ${authToken}`
			//         }
			//     }
			// });

			// const apolloClientAuthenticated = new ApolloClient({
			//     link: authLink.concat(httpLink),
			//     cache: new InMemoryCache(),
			// });

			return {
				...store,
				authenticated: true,
				authCookie: authToken,
				restClient: restClientAuthenticated
			};
		});
	}
};

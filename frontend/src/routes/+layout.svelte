<script lang="ts">
	import '../app.postcss';
	import { AppClient, type userIn } from '$lib/client';
	import { onMount } from 'svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { goto, invalidateAll } from '$app/navigation';
	// import { PUBLIC_API_URL } from '$env/static/public';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';
	import Sidebar from '$lib/components/display/Sidebar.svelte';
	import Navbar from '$lib/components/display/Navbar.svelte';
	import '../app.css';
	import Footer from '$lib/components/display/Footer.svelte';
	import Toast from '$lib/components/display/Toast.svelte';
	// import * as authHelpers from '$lib/services/utils/auth';

	const PUBLIC_API_URL = 'http://localhost:3010/api/';

	let message: string | null = null;
	let restClient: AppClient;

	$: authenticated = $clientStore.authenticated;

	toastStore.subscribe((value) => {
		message = value.toastMessage;
	});

	clientStore.subscribe((value) => {
		if (value.restClient !== null) {
			restClient = value.restClient;
		} else {
			// Rest Client not initialized, will need to programatically refresh page
			invalidateAll();
		}
	});

	async function resolveAuth(): Promise<void> {
		const intendedPath = window.location.pathname;

		if (localStorage.getItem('authToken') === null) {
			const restClient = new AppClient({
				BASE: PUBLIC_API_URL
			});
			clientStore.set({
				apiUrl: PUBLIC_API_URL,
				restClient: restClient,
				authCookie: null,
				authenticated: false
			});
			if (!intendedPath.includes('reset-password')) {
				// Stupid
				setTimeout(() => goto('auth/login'), 0);
			}
		} else {
			updateAuthContext.updateAuthContext();
		}
	}

	onMount(async (): Promise<void> => {
		await resolveAuth();
	});

	async function logout(): Promise<void> {
		localStorage.removeItem('authToken');
		get(clientStore).restClient?.auth.logout()
			.then(() => {
				clientStore.update((prevValue) => ({
					...prevValue,
					restClient: new AppClient({
						BASE: PUBLIC_API_URL
					}),
					authCookie: null
				}));
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Logged Out Successfully',
					type: ToastTypes.success
				}));
				goto('/auth/login');
			});
		await resolveAuth();
	}
</script>

{#if message}
	<Toast {message} />
{/if}

{#if authenticated}
	<main class="flex h-screen">
		<div>
			<Sidebar />
		</div>
		<div class="flex-1">
			<Navbar on:emitLoggedOut={logout} />
			<div class="main-ui-window mt-2 p-10">
				<slot />
			</div>
		</div>
	</main>
{:else}
	<slot />
{/if}

<Footer />

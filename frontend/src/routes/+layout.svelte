<script lang="ts">
	import '../app.postcss';
	import { AppClient } from '$lib/client';
	import { onMount } from 'svelte';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import updateAuthContext from '$lib/components/services/auth';
	import { ImageUploadClient } from '$lib/components/services/imageUploadClient';
	import Sidebar from '$lib/components/display/Sidebar.svelte';
	import Navbar from '$lib/components/display/Navbar.svelte';
	import '../app.css';
	import '../global.scss';
	import Footer from '$lib/components/display/Footer.svelte';
	import Toast from '$lib/components/display/Toast.svelte';
	import BreadCrumb from '$lib/components/display/BreadCrumb.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import CampMessageBanner from '$lib/components/display/CampMessageBanner.svelte';

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
			// Rest Client not initialized, will need
			// to programatically refresh page
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
				authenticated: false,
				imageUploadClient: null
			});
			if (!intendedPath.includes('reset-password') && !intendedPath.includes('confirm-email')) {
				setTimeout(() => goto('/auth/login'), 0);
			} else {
				goto(intendedPath);
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
		await clientStore.update((prevValue) => ({
			...prevValue,
			restClient: new AppClient({
				BASE: PUBLIC_API_URL
			}),
			imageUploadClient: new ImageUploadClient('', ''),
			authCookie: null
		}));
		toastStore.update((prevValue) => ({
			...prevValue,
			isOpen: true,
			toastMessage: 'Logged Out Successfully',
			type: ToastTypes.success
		}));
		goto('/auth/login');
		await resolveAuth();
	}
</script>

{#if message}
	<Toast {message} />
{/if}

{#if authenticated}
	<main class="flex h-screen flex-col">
		<Navbar on:emitLoggedOut={logout} />
		<div class="flex flex-1">
			<Sidebar />
			<div class="main-ui-window flex-1">
				<div class="mb-4">
					<CampMessageBanner />
					<BreadCrumb />
				</div>
				<slot />
			</div>
		</div>
	</main>
{:else}
	<slot />
{/if}

<Footer />

<style>
	.main-ui-window {
		flex-grow: 1;
		margin-top: 1rem;
		padding-left: 7rem;
		padding-right: 5rem;
		margin-bottom: 1rem;
	}
	.flex {
		display: flex;
	}
	.flex-1 {
		flex: 1;
	}

	@media (max-width: 768px) {
		.main-ui-window {
			padding-left: 32px;
			padding-right: 10px;
		}
		.flex {
			flex-direction: column;
		}
	}
</style>

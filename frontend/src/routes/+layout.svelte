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
	import {
		XMark
	} from 'svelte-heros-v2';

	let message: string | null = null;
	let restClient: AppClient;
	let showSidebarHint = true;

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

	function closeHint() {
		showSidebarHint = false;
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
		{#if showSidebarHint}
			<div class="sidebar-hint-widget">
				<div class="hint-content">
					<div class="hint-text">
						<p class="text-sm font-medium text-gray-700">
							💡 Click the green bar on the left to open navigation
						</p>
					</div>
					<button
						class="hint-close-btn"
						on:click={closeHint}
						aria-label="Close hint"
					>
						<XMark class="w-4 h-4" />
					</button>
				</div>
			</div>
		{/if}
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
		margin-bottom: 7rem;
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
	
	.sidebar-hint-widget {
		position: fixed;
		bottom: 20px;
		left: 40px;
		z-index: 1000;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		padding: 12px 16px;
		max-width: 280px;
		animation: slideInUp 0.3s ease-out;
	}

	.hint-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hint-text {
		flex: 1;
	}

	.hint-close-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		color: #6b7280;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hint-close-btn:hover {
		background-color: #f3f4f6;
		color: #374151;
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.sidebar-hint-widget {
			left: 20px;
			right: 20px;
			max-width: none;
		}
	}
</style>

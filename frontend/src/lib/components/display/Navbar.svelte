<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Navbar, NavUl, NavBrand, NavHamburger, Button, Avatar, Input } from 'flowbite-svelte';
	import { MagnifyingGlass } from 'svelte-heros-v2';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import SearchResultsDropdown from './SearchResultsDropdown.svelte';

	let initials: string;
	let searchQuery = '';
	let searchResults: any[] = [];
	let loading = false;

	const dispatch = createEventDispatcher();

	function emitLogOut() {
		dispatch('emitLoggedOut');
	}

	function searchAPI(query: string) {
		client.restClient?.search
			.postV1Search({
				search: query
			})
			.then((data) => {
				searchResults = data;
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
		loading = false;
	}

	const client = get(clientStore);
	const user = get(userStore);

	const handleClose = () => {
		searchResults = [];
	};

	function handleSearchInput(event: Event) {
		searchQuery = (event.target as HTMLInputElement).value;
		searchAPI(searchQuery); // Trigger API call when user types
	}

	$: searchResults;
	$: initials;
</script>

<Navbar
	navClass="sm:px-4 w-full top-0 left-0 border-b flex justify-between items-center"
	let:hidden
	let:toggle
>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ICFC</span>
	</NavBrand>
	<NavHamburger on:click={toggle} class="md:hidden" />
	<div class="ml-auto flex items-center space-x-4 pr-4">
		<div class="relative hidden md:block">
			<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
				<MagnifyingGlass class="h-4 w-4" />
			</div>
			<Input
				id="search-navbar"
				class="ps-10"
				placeholder="Search..."
				on:input={handleSearchInput}
			/>
			{#if searchResults}
				<div class="transform-translate-x-1/2 absolute left-1/2">
					<SearchResultsDropdown {searchResults} onClose={() => handleClose()} />
				</div>
			{/if}
		</div>
		<NavUl {hidden} class="flex items-center">
			<Button color="yellow" class="btn-override px-2 py-1" outline on:click={emitLogOut}
				>Pay Bill</Button
			>
		</NavUl>
		<NavUl {hidden} class="flex items-center">
			<Button class="btn-override px-2 py-1" outline on:click={emitLogOut}>Log Out</Button>
		</NavUl>
		<div class="flex items-center">
			{#if user.firstName && user.lastName}
				<Avatar>{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</Avatar>
			{:else}
				<Avatar>UK</Avatar>
			{/if}
		</div>
	</div>
</Navbar>

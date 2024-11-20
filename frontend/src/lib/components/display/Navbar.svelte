<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		Navbar,
		NavUl,
		NavBrand,
		NavHamburger,
		Button,
		Avatar,
		Input,
		NavLi
	} from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import SearchResultsDropdown from './SearchResultsDropdown.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

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
</script>

<div class="z-50">
	<Navbar let:hidden>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ICFC</span>
		</NavBrand>
		<NavHamburger />
		<NavUl {hidden}>
			<NavLi>
				<Button outline
					><a target="_blank" href={`${PUBLIC_BASE_URL}/yearbook_curr.pdf`}>Yearbook</a></Button
				>
			</NavLi>
			<NavLi>
				<Button outline
					><a target="_blank" href="https://www.paypal.com/ncp/payment/95N2K7CA3CPF4"></a>Pay Bill</Button
				>
			</NavLi>
			<NavLi>
				<Button outline on:click={emitLogOut}>Log Out</Button>
			</NavLi>
			<NavLi>
				{#if user.firstName && user.lastName}
					<Avatar>{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</Avatar>
				{:else}
					<Avatar>UK</Avatar>
				{/if}
			</NavLi>
			<NavLi>
				<div>
					<Input id="search-navbar" placeholder="Search..." on:input={handleSearchInput} />
					{#if searchResults}
						<div class="transform-translate-x-1/2 absolute left-1/2">
							<SearchResultsDropdown
								q={searchQuery}
								{searchResults}
								onClose={() => handleClose()}
							/>
						</div>
					{/if}
				</div>
			</NavLi>
		</NavUl>
	</Navbar>
	<div class="stripe-container">
		<div class="stripe stripe-red"></div>
		<div class="stripe stripe-blue"></div>
	</div>
</div>

<style lang="scss">
	.stripe-container {
		display: flex;
		flex-direction: column;
	}

	.stripe {
		height: 4px;
		width: 100%;
	}

	.stripe-red {
		background-color: rgba(218, 0, 0, 0.3); /* Very light red */
	}

	.stripe-blue {
		background-color: rgba(0, 0, 255, 0.3); /* Very light blue */
	}
</style>

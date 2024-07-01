<script lang="ts">
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Table from '$lib/components/display/Table.svelte';
	import Loader from '$lib/components/display/Loader.svelte';
	import IUser from '$lib/interfaces/IUser';

	let users: IUser[] = [];
	let loading: boolean = false;

	onMount(() => {
		loading = true;
		client.restClient?.users
			.getV1Users()
			.then((data) => {
				loading = false;
				data.map((user: any) => {
					users.push(new IUser(user));
				});
			})
			.catch((error) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
	});

	const client = get(clientStore);

	$: users;
</script>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={users}
		tableName="Directory"
		selectable={false}
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}

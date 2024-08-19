<script lang="ts">
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/display/Loader.svelte';
	import IRideshare from '$lib/interfaces/IRideshare';
	import Table from '$lib/components/display/Table.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';

	let _: IRideshare[] = [];
	let loading: boolean = false;
	let createRideshareForm = new FormBuilder().fromLocation().toLocation().offering().content().numberOfPassengers().build()

	onMount(() => {
		loading = true;
		client.restClient?.rideshares
			.getV1Rideshares()
			.then((data) => {
				data.map((rideshare: any) => {
					_.push(new IRideshare(rideshare));
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

		loading = false;
	});

	const client = get(clientStore);

	$: _;
</script>

<AddEdit
	form={createRideshareForm}
	openDrawerLabel="Add new rideshare"
/>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={_}
		tableName="Rideshares"
		selectable={false}
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}
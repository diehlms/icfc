<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Table from '$lib/components/display/Table.svelte';
	import Loader from '$lib/components/display/Loader.svelte';
	import ICabin from '$lib/interfaces/ICabin';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';

	let createCabinForm = new FormBuilder().name().bedrooms().washerdryer().dock().price_per_week().price_per_day().description().build();
	let cabins: ICabin[] = []
	let loading: boolean = true;

	onMount(() => {
		client.restClient?.cabins
			.getV1Cabins()
			.then((data) => {
				cabins = data.map((cabin: any) => new ICabin(cabin));
				loading = false;
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

	$: cabins;
</script>

<AddEdit
	form={createCabinForm}
	openDrawerLabel="Add Cabin"
/>

{#if loading}
	<Loader />
{:else if cabins.length > 0}
	<Table
		tableActions={[]}
		tableData={cabins}
		tableName="Cabins"
		selectable={false}
		columnNames={[
			'name',
			'bedrooms',
			'dock',
			'pricePerDay',
			'pricePerWeek',
			'washerDryer',
		]}
		searchableAttribute="Name"
		showSearch={false}
		followable={true}
	/>
{:else}
	<p>No cabins available.</p>  // Handle case where no data is returned
{/if}
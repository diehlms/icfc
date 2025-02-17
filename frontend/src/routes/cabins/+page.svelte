<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Table from '$lib/components/display/Table.svelte';
	import Loader from '$lib/components/display/Loader.svelte';
	import ICabin from '$lib/interfaces/ICabin';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import type { cabinIn, cabinOut } from '$lib/client';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';

	let createCabinForm = new FormBuilder()
		.text('name')
		.number('bedrooms')
		.checkbox('washerdryer')
		.checkbox('dock')
		.number('price_per_week')
		.number('price_per_week')
		.richText('description')
		.build();
	let cabins: ICabin[] = [];
	let loading: boolean = true;
	let errors: any = undefined;

	onMount(() => {
		client.restClient?.cabins
			.getV1Cabins()
			.then((data: cabinOut[]) => {
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

	const handleSubmit = (event: any) => {
		const cabinReq: cabinIn = {
			user_id: user.id as number,
			name: event.detail.name,
			bedrooms: event.detail.bedrooms,
			washerdryer: event.detail.washerdryer,
			dock: event.detail.dock,
			price_per_week: event.detail.price_per_week,
			price_per_day: event.detail.price_per_day,
			description: event.detail.description
		};

		client.restClient?.cabins
			.postV1Cabins({ cabin: cabinReq })
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Cabin added!',
					type: ToastTypes.success
				}));
			})
			.catch((error: any) => {
				errors = processApiErrorsToString(error.body);
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: errors,
					type: ToastTypes.error
				}));
			});
	};

	const client = get(clientStore);
	const user = get(userStore);

	$: cabins;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createCabinForm}
	openDrawerLabel="Add Cabin"
	{errors}
/>

{#if loading}
	<Loader />
{:else if cabins.length > 0}
	<Table
		tableActions={[]}
		tableData={cabins}
		tableName="Cabins"
		selectable={false}
		columnNames={['name', 'bedrooms', 'dock', 'pricePerDay', 'pricePerWeek', 'washerDryer']}
		searchableAttribute="Name"
		showSearch={false}
		followable={true}
	/>
{:else}
	<p>No cabins available.</p>
	// Handle case where no data is returned
{/if}

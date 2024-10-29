<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/display/Loader.svelte';
	import IRideshare from '$lib/interfaces/IRideshare';
	import Table from '$lib/components/display/Table.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import type { rideshareIn } from '$lib/client';

	let rideshares: IRideshare[] = [];
	let loading: boolean = false;
	let createRideshareForm: FormInput[];

	onMount(() => {
		loading = true;
		client.restClient?.locationPoints.getV1LocationPoints().then((data: any) => {
			const selectOptions = data.map((_: any) => {
				return {
					value: _.id,
					name: _.location_name
				};
			});
			createRideshareForm = new FormBuilder()
				.pointOfDeparture(selectOptions)
				.pointOfArrival(selectOptions)
				.offering()
				.content()
				.numberOfPassengers()
				.build();
		});

		client.restClient?.rideshares
			.getV1Rideshares()
			.then((data) => {
				rideshares = data.map((rideshare: any) => new IRideshare(rideshare));
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
		const rideshareReq: rideshareIn = {
			user_id: user.id,
			point_of_departure_id: event.detail.pointOfDeparture,
			point_of_arrival_id: event.detail.pointOfArrival,
			number_of_passengers: parseInt(event.detail.numberOfPassengers),
			seeking: true,
			arriving_at: '2024-12-21',
			departing_at: '2024-12-31',
			additional_information: 'foo'
		};

		client.restClient?.rideshares
			.postV1Rideshares(rideshareReq)
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Rideshare added!',
					type: ToastTypes.success
				}));
			})
			.catch((err) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: err,
					type: ToastTypes.error
				}));
			});
	};

	const client = get(clientStore);
	const user = get(userStore);

	$: rideshares;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createRideshareForm}
	openDrawerLabel="Add new rideshare"
/>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={rideshares}
		tableName="Rideshares"
		selectable={false}
		columnNames={[
			'seeking',
			'arrivingAt',
			'departingAt',
			'numberOfPassengers',
			'pointOfDeparture',
			'pointOfArrival'
		]}
		followable={true}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}

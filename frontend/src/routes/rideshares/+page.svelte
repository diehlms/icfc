<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/display/Loader.svelte';
	import IRideshare from '$lib/interfaces/IRideshare';
	import Table from '$lib/components/display/Table.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import type { locationPointIn, rideshareIn } from '$lib/client';
	import { createEntity } from '$lib/components/services/crud';
	import { Button, FloatingLabelInput, Input, Label } from 'flowbite-svelte';

	let rideshares: IRideshare[] = [];
	let loading: boolean = false;
	let createRideshareForm: FormInput[];
	let newLocation: string | undefined = undefined;

	const fetchData = () => {
		client.restClient?.locationPoints.getV1LocationPoints().then((data: any) => {
			const selectOptions = data.map((_: any) => {
				return {
					value: _.id,
					name: _.location_name
				};
			});
			createRideshareForm = new FormBuilder()
				.select(selectOptions, 'point_of_departure')
				.select(selectOptions, 'point_of_arrival')
				.checkbox('seeking')
				.richText('description')
				.number('number_of_passengers')
				.dateTime('arriving_at')
				.dateTime('departing_at')
				.build();
		});

		client.restClient?.rideshares
			.getV1Rideshares()
			.then((data) => {
				rideshares = data.map((rideshare: any) => new IRideshare(rideshare));
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};
	onMount(() => {
		loading = true;
		fetchData();
	});

	const handleSubmit = (event: any) => {
		loading = true;
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

		fetchData();
	};

	const handleAddLocationPoint = async () => {
		loading = true;
		const newLocationPoint: locationPointIn = {
			location_name: newLocation,
			location_description: newLocation
		};
		await createEntity(
			newLocationPoint,
			'Location Point',
			client.restClient?.locationPoints.postV1LocationPoints.bind(client.restClient.locationPoints)
		);
		fetchData();
	};

	const handleInput = (event: any) => {
		const { value } = event.target;
		newLocation = value;
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

<div class="mb-3">
	<Input
		size="lg"
		placeholder="Dont see departure/arrival location available in form? Add new one here"
		style="outlined"
		type="text"
		name="newLocationPoint"
		on:input={handleInput}
		bind:value={newLocation}
	>
		<Button slot="right" size="sm" color="green" outline on:click={handleAddLocationPoint}
			>Add</Button
		>
	</Input>
</div>

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

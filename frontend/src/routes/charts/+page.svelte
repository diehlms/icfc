<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import IChart from '$lib/interfaces/IChart';
	import Loader from '$lib/components/display/Loader.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import Table from '$lib/components/display/Table.svelte';
	import type { chartOut } from '$lib/client';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';

	let _: IChart[] = [];
	let loading: boolean = false;
	let formData = new FormData();
	let createChartForm = new FormBuilder().text('caption').attachment('chart').build();
	let errors: any = undefined;

	const handleSubmit = (event: any) => {
		formData.append('chart[chart]', event.detail.files.accepted[0]);
		formData.append('chart[caption]', event.detail.caption);
		formData.append('chart[user_id]', user.id?.toString() as string);

		client.imageUploadClient
			?.uploadImage('/v1/charts/', formData)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Chart added!',
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

	onMount(() => {
		loading = true;
		client.restClient?.charts
			.getV1Charts()
			.then((data: chartOut[]) => {
				_ = data.map((chart: chartOut) => new IChart(chart));
				loading = false;
				loading = false;
			})
			.catch((error: any) => {
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
	const user = get(userStore);

	$: _;
</script>

<AddEdit
	on:triggerModalFormSubmit={(event) => handleSubmit(event)}
	form={createChartForm}
	openDrawerLabel="Add new chart"
	{errors}
/>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={_}
		tableName="Charts"
		selectable={false}
		columnNames={['caption', 'createdAt', 'updatedAt']}
		searchableAttribute="caption"
		showSearch={false}
		followable={true}
	/>
{/if}

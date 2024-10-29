<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import IChart from '$lib/interfaces/IChart';
	import Loader from '$lib/components/display/Loader.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import Table from '$lib/components/display/Table.svelte';

	let _: IChart[] = [];
	let loading: boolean = false;
	let formData = new FormData();
	let createChartTreeForm = new FormBuilder().title().attachment().build();

	const handleSubmit = (event) => {
		formData.append('chart', event.detail.files.accepted[0]);
		formData.append('caption', event.detail.caption);
		formData.append('user_id', user.id);

		client.imageUploadClient
			?.uploadImage('v1/charts/', formData)
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Chart added!',
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

	onMount(() => {
		loading = true;
		client.restClient?.charts
			.getV1Charts()
			.then((data) => {
				_ = data.map((chart: any) => new IChart(chart));
				loading = false;
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
	const user = get(userStore);

	$: _;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createChartTreeForm}
	openDrawerLabel="Add new chart"
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

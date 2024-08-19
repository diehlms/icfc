<script lang="ts">
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import IChart from '$lib/interfaces/IChart';
	import Loader from '$lib/components/display/Loader.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import Table from '$lib/components/display/Table.svelte';

	let _: IChart[] = [];
	let loading: boolean = false;
	let createChartTreeForm = new FormBuilder().title().attachment().build()

	onMount(() => {
		loading = true;
		client.restClient?.charts
			.getV1Charts()
			.then((data) => {
				data.map((chart: any) => {
					_.push(new IChart(chart));
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
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}
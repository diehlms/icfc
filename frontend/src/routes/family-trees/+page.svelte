<script lang="ts">
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/display/Loader.svelte';
	import IFamilyTree from '$lib/interfaces/IFamilyTree';
	import Table from '$lib/components/display/Table.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';

	let _: IFamilyTree[] = [];
	let loading: boolean = false;
	let createFamilyTreeForm = new FormBuilder().name().build()

	onMount(() => {
		loading = true;
		client.restClient?.familyTrees
			.getV1FamilyTrees()
			.then((data) => {
				data.map((familyTree: any) => {
					_.push(new IFamilyTree(familyTree));
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
	form={createFamilyTreeForm}
	openDrawerLabel="Add new family tree"
/>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={_}
		tableName="Family Trees"
		selectable={false}
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}
<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Loader from '$lib/components/display/Loader.svelte';
	import IFamilyTree from '$lib/interfaces/IFamilyTree';
	import Table from '$lib/components/display/Table.svelte';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { type familyTreeIn } from '$lib/client/models/familyTreeIn';
	import type { familyTreeOut } from '$lib/client';
	import { createEntity } from '$lib/components/services/crud';

	let familyTrees: IFamilyTree[] = [];
	let loading: boolean = true;
	let createFamilyTreeForm = new FormBuilder().text('name').build();
	let errors: any = undefined;

	const fetchData = () => {
		client.restClient?.familyTrees
			.getV1FamilyTrees()
			.then((data: familyTreeOut[]) => {
				familyTrees = data.map((familyTree: familyTreeOut) => new IFamilyTree(familyTree));
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
	};

	onMount(() => {
		fetchData();
	});

	const handleSubmit = (event: any) => {
		loading = true;
		const familyTreeReq: familyTreeIn = {
			user_id: user.id,
			name: event.detail.name
		};
		createEntity(
			familyTreeReq,
			'Family tree',
			client.restClient?.familyTrees.postV1FamilyTrees.bind(client.restClient.familyTrees)
		);
		fetchData();
		loading = false;
	};

	const client = get(clientStore);
	const user = get(userStore);

	$: familyTrees;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createFamilyTreeForm}
	openDrawerLabel="Add new family tree"
	{errors}
/>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={familyTrees}
		tableName="Family Trees"
		selectable={false}
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
		followable={true}
	/>
{/if}

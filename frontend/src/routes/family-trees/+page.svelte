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

	let familyTrees: IFamilyTree[] = [];
	let loading: boolean = true;
	let createFamilyTreeForm = new FormBuilder().name().build();

	const fetchData = () => {
		client.restClient?.familyTrees
			.getV1FamilyTrees()
			.then((data) => {
				familyTrees = data.map((familyTree: any) => new IFamilyTree(familyTree));
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

		loading = false;
	};

	onMount(() => {
		fetchData();
	});

	const handleSubmit = (event: any) => {
		const familyTreeReq: familyTreeIn = {
			user_id: user.id,
			name: event.detail.name
		};

		console.log(familyTreeReq);

		client.restClient?.familyTrees
			.postV1FamilyTrees({ family_tree: familyTreeReq })
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Family tree!',
					type: ToastTypes.success
				}));
				fetchData();
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

	$: familyTrees;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createFamilyTreeForm}
	openDrawerLabel="Add new family tree"
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

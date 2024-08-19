<script lang="ts">
	import { Drawer, CloseButton, Timeline, TimelineItem, Button, Table } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn, cabinIn, rideshareIn } from '$lib/client';
	import { ArrowRight } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';
	import Loader from '$lib/components/display/Loader.svelte';
	import ICabin from '$lib/interfaces/ICabin';

	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let _: ICabin[] = []
	let loading: boolean = false;

	const client = get(clientStore);

	onMount(async () => {
		loading = true;
	
		client.restClient?.cabins
			.getV1Cabins()
			.then((data) => {
				data.map((cabin: any) => {
					_.push(new ICabin(cabin));
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

	$: _;
</script>

<div class="text-center">
	<Button on:click={() => (hidden1 = false)}>Show drawer</Button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
</Drawer>

{#if loading}
	<Loader />
{:else}
	<Table
		tableActions={[]}
		tableData={_}
		tableName="Cabins"
		selectable={false}
		columnNames={['name']}
		searchableAttribute="Name"
		showSearch={false}
	/>
{/if}
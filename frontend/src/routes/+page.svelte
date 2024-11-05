<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
	import { clientStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let campers: any[] = [];
	let initial: any[] = [];
	let articles: any[] = [];
	let events: any[] = [];
	let error: any;
	let loading = true;

	const client = get(clientStore);

	onMount(async () => {
		try {
			[initial, articles, campers, events] = await Promise.all([
				client.restClient?.entry.getV1EntryInitialPayload(),
				client.restClient?.entry.getV1EntryRecentArticles(),
				client.restClient?.entry.getV1EntryCampers(),
				client.restClient?.entry.getV1EntryThisWeeksEvents()
			]);
		} catch (err) {
			error = err.message || 'An error occurred while fetching data.';
		} finally {
			loading = false;
		}
	});

	function getBreakfast() {
		const d = new Date().getDay();
		switch (d) {
			case 2:
			case 4:
			case 6:
				return 'Egg Day';
			case 1:
			case 5:
				return 'Pancake Day';
			case 3:
				return 'French Toast Day';
			case 0:
				return 'Sunday Brunch';
			default:
				return;
		}
	}

	$: articles;
	$: campers;
	$: events;
</script>

<div class="p-8">
	{#if loading}
		<Loader />
	{:else if error}
		<div class="alert alert-error">{error}</div>
	{:else if events && campers && articles}
		<h1 class="mb-4 text-center text-4xl font-bold">Iron City Fishing Club</h1>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<!-- Breakfast Card -->
			<div class="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Today's Breakfast</h2>
				<p class="text-gray-600">{getBreakfast()}</p>
			</div>

			<!-- Events Card -->
			<div class="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">This Week's Events</h2>
				<ul class="list-inside list-disc">
					{#if events.length > 0}
						{#each events as event}
							<li>{event.title} - {event.date}</li>
						{/each}
					{:else}
						<span>No events this week!</span>
					{/if}
				</ul>
			</div>

			<!-- Articles Card -->
			<div class="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Recent Articles</h2>
				<ul class="list-inside list-disc">
					{#if articles.length > 0}
						{#each articles as article}
							<li>{article.title}</li>
						{/each}
					{:else}
						<span>No articles this week!</span>
					{/if}
				</ul>
			</div>

			<!-- Campers Card -->
			<div class="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Campers</h2>
				<ul class="list-inside list-disc">
					{#if campers.length > 0}
						{#each campers as camper}
							<li>{camper.title}</li>
						{/each}
					{:else}
						<span>No campers this week!</span>
					{/if}
				</ul>
			</div>

			<!-- Larger Image Cards -->
			<div
				class="col-span-1 row-span-2 overflow-hidden rounded-lg bg-gray-100 shadow-md md:col-span-2"
			>
				<img src="/path/to/image1.jpg" alt="Featured Image 1" class="h-full w-full object-cover" />
			</div>

			<div
				class="col-span-1 row-span-2 overflow-hidden rounded-lg bg-gray-100 shadow-md md:col-span-2"
			>
				<img src="/path/to/image2.jpg" alt="Featured Image 2" class="h-full w-full object-cover" />
			</div>
		</div>
	{/if}
</div>

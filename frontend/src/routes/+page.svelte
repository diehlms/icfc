<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
	import { formatDate } from '$lib/components/services/textFormatting';
	import { clientStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { Listgroup } from 'flowbite-svelte';

	let campers: any[] = [];
	let articles: any[] = [];
	let events: any[] = [];
	let error: any;
	let loading = true;
	let simpleList = [
		"Office Telephone: 705-375-2300 (in season only)",
		"Moe's Number: 705-746-6699",
		"Lisa's Number: 705-346-1191",
		"Gregoire Home Telephone: 705-375-5633",
		"Randy Grisdale: 705-774-4179",
		"ICFC Email: ICFC@vianet.on.ca",
		"ICFC Fax: 705-375-0405",
	];

	const client = get(clientStore);

	onMount(async () => {
		try {
			client.restClient?.entry.getV1EntryInitialPayload().then((res: any) => {
				articles = res.articles;
				const currentDate = new Date();
				const filteredCampers = res.campers.filter((camper: any) => {
					const arrivalDate = new Date(camper.arrival);
					const departureDate = new Date(camper.departure);
					return arrivalDate <= currentDate && departureDate >= currentDate;
				});
				campers = filteredCampers;
				events = res.events;
			});
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

<div class="background-image"></div>

<div class="landing-page p-8">
	{#if loading}
		<Loader />
	{:else if error}
		<div class="alert alert-error">{error}</div>
	{:else if events && campers && articles}
		<h1 class="mb-4 text-center text-4xl font-bold">Iron City Fishing Club</h1>

		<div class="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md opacity-80">
			<h2 class="mb-4 text-xl font-semibold">This Week's Events</h2>
			<ul class="list-inside list-disc">
				{#if events.length > 0}
					{#each events as event}
						<li class="text-teal-600">
							<a href={`/events/${event.id}`}>{event.title} - {formatDate(event.start_time)}</a>
						</li>
					{/each}
				{:else}
					<span>No events this week!</span>
				{/if}
			</ul>
		</div>

		<div class="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md mt-5 mb-5 opacity-80">
			<h2 class="mb-4 text-xl font-semibold">Campers</h2>
			<ul class="max-h-32 list-inside list-disc overflow-y-scroll">
				{#if campers.length > 0}
					{#each campers as camper}
						<li>{camper.name}</li>
					{/each}
				{:else}
					<span>No campers this week!</span>
				{/if}
			</ul>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 opacity-80">
			<div class="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Today's Breakfast</h2>
				<p class="text-gray-600">{getBreakfast()}</p>
			</div>

			<div class="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Recent Articles</h2>
				<ul class="list-inside list-disc">
					{#if articles.length > 0}
						{#each articles as article}
							<li class="text-teal-600">
								<a href={`/articles/${article.id}`}>{article.title}</a>
							</li>
						{/each}
					{:else}
						<span>No articles this week!</span>
					{/if}
				</ul>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-1 mt-5 opacity-80">
			<div class="flex flex-col justify-start rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Important Contacts</h2>
				<Listgroup items={simpleList} let:item class="w-full">
					<span>{item}</span>	
				</Listgroup>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.background-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('../assets/images/flags.jpg');
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: -1;
	}
</style>

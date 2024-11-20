<script lang="ts">
	import { page } from '$app/stores';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let searchString: string | undefined = '';
	let loading = false;
	let searchResults: any[] = [];

	const limitResults = (array = [], limit = 5) => array.slice(0, limit);

	onMount(() => {
		searchString = $page.url.search.slice(3).toString();

		client.restClient?.search
			.postV1Search({
				search: searchString
			})
			.then((data) => {
				searchResults = data;
			})
			.catch((error: any) => {
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
	});

	const client = get(clientStore);

	$: hasResults =
		searchResults &&
		(searchResults.articles?.length > 0 ||
			searchResults.events?.length > 0 ||
			searchResults.users?.length > 0 ||
			searchResults.cabins?.length > 0);

	$: searchString;
</script>

<h1>Query: {searchString}</h1>

{#if hasResults}
	{#if searchResults.articles?.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 font-medium">Articles</h4>
			<ul class="space-y-2">
				{#each limitResults(searchResults.articles) as article}
					<li class="rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
						<a href="/articles/{article.id}" class="block">
							<div class="font-medium">{article.title}</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if searchResults.events?.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 font-medium">Events</h4>
			<ul class="space-y-2">
				{#each limitResults(searchResults.events) as event}
					<li class="rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
						<a href="/events/{event.id}" class="block">
							<div class="font-medium">{event.events}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								{event.location}: {event.start_time} - {event.end_time}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if searchResults.users?.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 font-medium">Users</h4>
			<ul class="space-y-2">
				{#each limitResults(searchResults.users) as user}
					<li class="rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
						<div class="font-medium">{user.firstname} {user.lastname}</div>
						<div class="text-sm text-gray-500 dark:text-gray-400">
							{user.role || user.email}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if searchResults.cabins?.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 font-medium">Cabins</h4>
			<ul class="space-y-2">
				{#each limitResults(searchResults.cabins) as cabin}
					<li class="rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
						<a href="/cabins/{cabin.id}" class="block">
							<div class="font-medium">{cabin.name}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								{cabin.location}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
{/if}

<script>
	import { Card, Button } from 'flowbite-svelte';
	import { XCircle } from 'svelte-heros-v2';

	export let searchResults;
	export let onClose;

	// Helper function to limit results
	const limitResults = (array = [], limit = 5) => array.slice(0, limit);

	$: hasResults =
		searchResults &&
		(searchResults.articles?.length > 0 ||
			searchResults.events?.length > 0 ||
			searchResults.users?.length > 0 ||
			searchResults.cabins?.length > 0);
</script>

{#if hasResults}
	<Card class="absolute top-2 z-50 max-h-[32rem] w-96 overflow-y-auto shadow-lg">
		<div
			class="sticky top-0 flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800"
		>
			<h3 class="font-semibold">Search Results</h3>
			<Button
				color="red"
				outline
				size="sm"
				on:click={onClose}
				class="h-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
			>
				<XCircle />
			</Button>
		</div>

		<div class="p-4">
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
					{#if searchResults.articles.length > 5}
						<!-- <Separator class="my-2" /> -->
					{/if}
				</div>
			{/if}

			{#if searchResults.events?.length > 0}
				<div class="mb-4">
					<h4 class="mb-2 font-medium">Events</h4>
					<ul class="space-y-2">
						{#each limitResults(searchResults.events) as event}
							<li class="rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
								<a href="/events/{event.id}" class="block">
									<div class="font-medium">{event.title}</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">
										{event.date}
									</div>
								</a>
							</li>
						{/each}
					</ul>
					{#if searchResults.events.length > 5}
						<!-- <Separator class="my-2" /> -->
					{/if}
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
					{#if searchResults.users.length > 5}
						<!-- <Separator class="my-2" /> -->
					{/if}
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
					{#if searchResults.cabins.length > 5}
						<!-- <Separator class="my-2" /> -->
					{/if}
				</div>
			{/if}

			<a href="/search" class="block">
				<Button variant="outline" class="mt-2 flex w-full items-center justify-center gap-2">
					View All Results
					<!-- <ArrowRight class="h-4 w-4" /> -->
				</Button>
			</a>
		</div>
	</Card>
{/if}

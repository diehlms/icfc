<script lang="ts">
  import { clientStore } from '$lib/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let campers: any[] = [];
  let initial: any[] = []
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
			console.log(initial, articles, campers, events)
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
      case 6: return 'Egg Day';
      case 1:
      case 5: return 'Pancake Day';
      case 3: return 'French Toast Day';
      case 0: return 'Sunday Brunch';
      default: return;
    }
  }

	$: articles;
	$: campers;
	$: events;
</script>

<div class="p-8">
  {#if loading}
    <div class="flex justify-center items-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
    </div>
  {:else if error}
    <div class="alert alert-error">{error}</div>
  {:else if events && campers && articles}
	    <!-- Site Title -->
			<h1 class="text-4xl font-bold text-center mb-4">Welcome to the Family Dashboard</h1>

			<!-- Row of Buttons -->
			<div class="flex justify-center mb-8">
				<button class="bg-blue-500 text-white text-sm px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring">Action 1</button>
				<button class="bg-green-500 text-white text-sm px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none focus:ring">Action 2</button>
				<button class="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring">Action 3</button>
			</div>

			
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Breakfast Card -->
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold mb-4">Today's Breakfast</h2>
        <p class="text-gray-600">{getBreakfast()}</p>
      </div>

      <!-- Events Card -->
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold mb-4">This Week's Events</h2>
        <ul class="list-disc list-inside">
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
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold mb-4">Recent Articles</h2>
        <ul class="list-disc list-inside">
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
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold mb-4">Campers</h2>
        <ul class="list-disc list-inside">
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
      <div class="col-span-1 md:col-span-2 row-span-2 bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <img src="/path/to/image1.jpg" alt="Featured Image 1" class="object-cover w-full h-full">
      </div>

      <div class="col-span-1 md:col-span-2 row-span-2 bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <img src="/path/to/image2.jpg" alt="Featured Image 2" class="object-cover w-full h-full">
      </div>
    </div>
  {/if}
</div>


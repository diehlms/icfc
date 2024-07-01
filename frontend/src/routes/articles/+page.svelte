<script lang="ts">
	import { Drawer, CloseButton, Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn } from '$lib/client';
	import { ArrowRight } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';

	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let articles: articleIn[] = [];
	let loading: boolean = false;

	onMount(() => {
		loading = true;
		client.restClient?.articles
			.getV1Articles()
			.then((data) => {
				articles = data;
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
	});

	const client = get(clientStore);

	$: articles;
</script>

<div class="text-center">
	<Button on:click={() => (hidden1 = false)}>Show drawer</Button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			Info
		</h5>
		<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
	</div>
	<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
		Supercharge your hiring by taking advantage of our <a
			href="/"
			class="text-primary-600 underline hover:no-underline dark:text-primary-500"
		>
			limited-time sale
		</a>
		for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
		job board.
	</p>
	<div class="grid grid-cols-2 gap-4">
		<Button color="light" href="/">Learn more</Button>
		<Button href="/" class="px-4">Get access <ArrowRight class="ms-2 h-5 w-5" /></Button>
	</div>
</Drawer>

{#if articles}
	<Timeline>
		{#each articles as article}
			<TimelineItem title={article.title} date={article.created_at}>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{article.content?.slice(0, 264)}
				</p>
				<Button color="alternative"
					>Learn more<ArrowRight href={`/articles/${article.id}`} class="ms-2 h-5 w-5" /></Button
				>
			</TimelineItem>
		{/each}
	</Timeline>
{/if}

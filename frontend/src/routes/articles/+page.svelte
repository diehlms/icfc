<script lang="ts">
	import { Drawer, CloseButton, Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn } from '$lib/client';
	import { ArrowRight } from 'svelte-heros-v2';
	import FormBuilder from '$lib/components/services/formBuilder';
	import AddEdit from '$lib/components/display/AddEdit.svelte';

	let articles: articleIn[] = [];
	let loading: boolean = false;
	let createUserForm = new FormBuilder().title().content().attachment().build();

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

<AddEdit
	form={createUserForm}
	openDrawerLabel="Add new article"
/>

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

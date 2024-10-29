<script lang="ts">
	import { Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn } from '$lib/client';
	import { ArrowRight, Pencil, Trash } from 'svelte-heros-v2';
	import FormBuilder from '$lib/components/services/formBuilder';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import Loader from '$lib/components/display/Loader.svelte';
	import updateAuthContext from '$lib/components/services/auth';

	let articles: articleIn[] = [];
	let loading: boolean = false;
	let createArticleForm = new FormBuilder().title().content().build();
	let currentPage = 1;
	let fetchedAll: boolean = false;
	let isFetchingMore = false;
	let maxPageLength = 3;

	// Add these helper functions
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// const isUserAuthorized = (articleUserId: string) => {
	// 	return user.isAdmin || articleUserId === user.id;
	// };

	const fetchArticles = (page: number) => {
		loading = true;
		client.restClient?.articles
			.getV1Articles(page)
			.then((data) => {
				if (data.length < maxPageLength) {
					fetchedAll = true;
				}
				const newArticles = data;
				articles = [...articles, ...newArticles];
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
			})
			.finally(() => {
				isFetchingMore = false;
			});
	};

	const handleScroll = (event: Event) => {
		const container = event.target as HTMLElement;
		if (
			container.scrollTop + container.clientHeight >= container.scrollHeight - 100 &&
			!isFetchingMore &&
			!fetchedAll
		) {
			isFetchingMore = true;
			currentPage++;
			fetchArticles(currentPage); // Fetch the next page of articles
		}
	};

	// Attach the scroll event listener and fetch initial images
	onMount(() => {
		fetchArticles(currentPage); // Initial fetch
		const scrollContainer = document.querySelector('.main-ui-window');
		scrollContainer?.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll); // Clean up scroll listener
		};
	});

	const handleSubmit = (event: any) => {
		const articleReq: articleIn = {
			user_id: user.id,
			content: event.detail.content,
			title: event.detail.title,
			pinned: false
		};

		client.restClient?.articles
			.postV1Articles({ article: articleReq })
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Article added!',
					type: ToastTypes.success
				}));
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

	$: articles;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createArticleForm}
	openDrawerLabel="Add new article"
/>

{#if articles}
	<div class="w-full space-y-6">
		{#each articles as article}
			<div
				class="relative w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<!-- Author Info & Date -->
				<div class="mb-4 flex items-start justify-between">
					<div>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white">
							<a href={`/articles/${article.id}`} class="inline-flex items-center">
								{article.title}
								<ArrowRight class="ms-2 h-5 w-5" />
							</a>
						</h3>
						<div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Posted by {article.user?.email || 'Unknown'}
						</div>
					</div>
					<div class="text-right">
						<div class="text-sm font-medium text-gray-600 dark:text-gray-300">
							{formatDate(article.created_at)}
						</div>
					</div>
				</div>

				<div class="flex gap-6">
					<div class="flex-1">
						<pre class="mb-4 whitespace-pre-wrap text-base text-gray-700 dark:text-gray-300">
							{@html article.content?.slice(0, 248)}<span class="text-gray-400">...</span>
						</pre>

						<!-- <div class="mt-4 flex items-center gap-4">
							{#if updateAuthContext.userActionPermitted(article.user_id, user)}
								<div class="flex gap-2">
									<Button color="light" size="sm" class="inline-flex items-center">
										<Pencil class="mr-2 h-4 w-4" />
										Edit
									</Button>
									<Button color="red" size="sm" class="inline-flex items-center">
										<Trash class="mr-2 h-4 w-4" />
										Delete
									</Button>
								</div>
							{/if}
						</div> -->

						<div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
							{article.comments.length}
							{article.comments.length === 1 ? 'comment' : 'comments'}
						</div>
					</div>
				</div>
				{#if article.image && article.image.url}
					<div class="flex-shrink-0">
						<img
							src={`http://icfc.localhost:3010${article.image.url}`}
							alt="Attachment"
							class="block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
						/>
					</div>
				{/if}
			</div>
		{/each}

		{#if isFetchingMore}
			<div class="flex justify-center">
				<Loader />
			</div>
		{/if}
	</div>
{/if}

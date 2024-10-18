<script lang="ts">
	import { Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn } from '$lib/client';
	import { ArrowRight } from 'svelte-heros-v2';
	import FormBuilder from '$lib/components/services/formBuilder';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import BreadCrumb from '$lib/components/display/BreadCrumb.svelte';

	let articles: articleIn[] = [];
	let loading: boolean = false;
	let createArticleForm = new FormBuilder().title().content().build();

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

	const handleSubmit = (event: any) => {
		const articleReq: articleIn = {
			user_id: user.id,
			content: event.detail.content,
			title: event.detail.title,
			pinned: false,
		}

		client.restClient?.articles.postV1Articles({article: articleReq}).then(res => {
			toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Article added!',
					type: ToastTypes.success
				}));
		}).catch(err => {
			toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: err,
					type: ToastTypes.error
			}));
		})
	}

	const client = get(clientStore);
	const user = get(userStore)

	$: articles;
</script>

<BreadCrumb localPathName="articles" />

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createArticleForm}
	openDrawerLabel="Add new article"
/>

<div class="w-11/12">
	{#if articles}
		<Timeline>
			{#each articles as article}
				<TimelineItem title={article.title} date={article.created_at}>
					<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						{article.content?.slice(0, 264)}
					</p>
					{#if article.attachment}
							<div class="absolute right-0 top-0">
								<a href="http://icfc.localhost:3000/{article.attachment.url}" target="_blank">
									<img
										src={article.attachment.url}
										alt="Attachment"
										class="w-24 h-auto float-right"
									/>
								</a>
							</div>
						{/if}
					<Button color="alternative"
						><ArrowRight class="ms-2 h-5 w-5" />
							<a href={`/articles/${article.id}`}> 
								Learn more
							</a>
						</Button
					>
					<p>{article.comments.length} comments</p>
				</TimelineItem>
			{/each}
		</Timeline>
	{/if}
</div>

<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
	import { Textarea, Button, Hr, Listgroup, Gallery } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { type articleUpdate, type commentIn } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import AttachmentUploader from '$lib/components/display/AttachmentUploader.svelte';
	import { Trash, RocketLaunch } from 'svelte-heros-v2';
	import { hotSwapProductionUris } from '$lib/components/services/imageUtils';
	import { createEntity, deleteEntity, editEntity } from '$lib/components/services/crud';
	import InteractiveImage from '$lib/components/display/InteractiveImage.svelte';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';

	let article: any;
	let loading: boolean = true;
	let comment: string = 'Write a comment...';
	let formData = new FormData();
	let editArticleForm: FormInput[];

	export let data: any;

	const fetchData = () => {
		client.restClient?.articles
			.getV1Articles1(data.id)
			.then((data) => {
				console.log(data)
				article = data;
				editArticleForm = new FormBuilder().text('title').richText('content').build(article);
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
		loading = false;
	};

	onMount(() => {
		fetchData();
	});

	const handleArticleImageUpload = (event: any) => {
		loading = true;

		if (event.detail.files.accepted.length > 1) {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: 'Can only add 1 image per article at this time',
				type: ToastTypes.error
			}));
		}

		formData.append('article[image]', event.detail.files.accepted[0]);
		formData.append('user_id', user.id);

		client.imageUploadClient
			?.uploadImage(`/v1/articles/${article.id}/upload_image`, formData, 'PATCH')
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Images added!',
					type: ToastTypes.success
				}));
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body),
					type: ToastTypes.error
				}));
			})
			.finally(() => fetchData());
	};

	const createComment = () => {
		loading = true;
		const payload: commentIn = {
			content: comment,
			article_id: data.id,
			user_id: user.id as number
		};
		createEntity(
			payload,
			'Comment',
			client.restClient?.comments.postV1Comments.bind(client.restClient.comments)
		).finally(() => fetchData());
		loading = false;
	};

	const deleteComment = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Comment',
			client.restClient?.comments.deleteV1Comments.bind(client.restClient.comments)
		).finally(() => fetchData());
		loading = false;
	};

	const deleteArticle = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Article',
			client.restClient?.articles.deleteV1Articles.bind(client.restClient.articles)
		).finally(() => goto('/articles'));
		loading = false;
	};

	const editArticle = (event: any) => {
		loading = true;
		let articleUpdatePayload: articleUpdate = {
			title: event.detail.title,
			content: event.detail.content
		};
		editEntity(
			article.id,
			{ article: articleUpdatePayload, user_id: user.id as number },
			'Article',
			client.restClient?.articles.putV1Articles.bind(client.restClient.articles)
		).finally(() => fetchData());
		loading = false;
	};

	const handleInput = (event: any) => {
		const { value } = event.target;
		comment = value;
	};

	const user = get(userStore);
	const client = get(clientStore);

	$: article;
</script>

{#if loading}
	<Loader />
{:else if article}
	<div class="h-full pb-10">
		<h1>
			{article.title}
			{#if updateAuthContext.userActionPermitted(article.user.id, user)}
				<Button color="red" size="xs" on:click={() => deleteArticle(article.id)}><Trash /></Button>
				<AddEdit
					on:triggerModalFormSubmit={editArticle}
					form={editArticleForm}
					openDrawerLabel=""
					displayAsButton={true}
				/>
			{/if}
		</h1>
		<Timestamps textAlign="text-left" model={article} />
		<Hr />
		<div class="flex">
			<div class="{!!article.image.url ? 'w-2/3' : 'w-full'}">
				<div class="article-content">
					{@html article.content}
				</div>
			</div>

			{#if !!article.image.url}
				<div class="w-1/3 p-4">
					<Gallery class="gap-4">
						<InteractiveImage
							on:handleDelete={() => {}}
							item={{
								src: hotSwapProductionUris(article.image.url),
								alt: `Image for ${article.title}`
							}}
							isOwner={() => updateAuthContext.userActionPermitted(article.user.id, user)}
						/>
					</Gallery>
				</div>
			{/if}
		</div>

		{#if updateAuthContext.userActionPermitted(article.user.id, user)}
			<AttachmentUploader on:triggerAttachmentUpload={handleArticleImageUpload} />
		{/if}

		<div class="mt-4">
			<form>
				<Textarea on:change={handleInput} class="mb-4" placeholder="Write a comment...">
					<div slot="footer" class="flex items-center justify-between">
						<Button color="green" outline on:click={createComment} type="submit"
							><RocketLaunch /></Button
						>
					</div>
				</Textarea>
			</form>
		</div>

		<Hr />

		<h2 class="mb-2">Comments</h2>

		{#if article.comments && article.comments.length > 0}
			<Listgroup items={article.comments} let:item class="w-full p-3">
				<Timestamps textAlign={'text-left'} model={item} />
				<pre class="mb-4 whitespace-pre-wrap text-base text-gray-700 dark:text-gray-300">
	{@html item.content}</pre>
				{#if updateAuthContext.userActionPermitted(item.user_id, user)}
					<Button outline size="xs" color="red" on:click={() => deleteComment(item.id)}
						><Trash /></Button
					>
				{/if}
			</Listgroup>
		{/if}
	</div>
{/if}

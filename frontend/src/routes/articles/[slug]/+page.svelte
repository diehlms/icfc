<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
	import { Textarea, Button, Hr, Listgroup, Gallery } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { type articleIn, type commentIn } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import AttachmentUploader from '$lib/components/display/AttachmentUploader.svelte';
	import { Trash, RocketLaunch } from 'svelte-heros-v2';

	let article: any;
	let loading: boolean = true;
	let comment: string = 'Write a comment...';
	let formData = new FormData();
	let editArticleForm: FormInput[];

	export let data: any;

	onMount(() => {
		client.restClient?.articles
			.getV1Articles1(data.id)
			.then((data) => {
				article = data;
				editArticleForm = new FormBuilder().title().content().build(article);
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
	});

	const handleArticleImageUpload = (event: any) => {
		if (event.detail.files.accepted.length > 1) {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: 'Can only add 1 image per article at this time',
				type: ToastTypes.error
			}));
		}

		formData.append('article[image]', event.detail.files.accepted[0]);

		client.imageUploadClient
			?.uploadImage(`v1/articles/${article.id}/upload_image`, formData, 'PATCH')
			.then((res) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Images added!',
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

	const onSubmit = () => {
		const Comment: commentIn = {
			content: comment,
			article_id: data.id,
			user_id: user.id
		};

		client.restClient?.comments
			.postV1Comments(Comment)
			.then((data) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Comment Added',
					type: ToastTypes.success
				}));
				article.comments.push(data);
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

	const deleteComment = (id) => {
		loading = true;
		client.restClient?.comments
			.deleteV1Comments(id)
			.then((_) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Comment deleted',
					type: ToastTypes.success
				}));
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
	};

	const deleteArticle = (id) => {
		loading = true;
		client.restClient?.articles
			.deleteV1Articles(id)
			.then((_) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Article deleted',
					type: ToastTypes.success
				}));
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
	};

	const editArticle = (event: any) => {
		loading = true;

		let articleUpdatePayload: articleIn = {
			title: event.detail.title,
			content: event.detail.content
		};

		client.restClient?.articles
			.putV1Articles(article.id, { article: articleUpdatePayload })
			.then((_) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Article updated',
					type: ToastTypes.success
				}));
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
	<h1>
		{article.title}
		{#if updateAuthContext.userActionPermitted(article.user_id, user)}
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
		<div class="{!!article.image.url ? 'w-2/3' : 'w-full'} p-4">
			<div class="article-content p-6">
				<pre
					class="mb-4 whitespace-pre-wrap text-base text-gray-700 dark:text-gray-300">{@html article.content}</pre>
			</div>
		</div>

		{#if !!article.image.url}
			<div class="w-1/3 p-4">
				<Gallery class="gap-4">
					<img
						src="http://icfc.localhost:3010{article.image.url}"
						alt={''}
						class="h-auto max-w-full rounded-lg"
					/>
				</Gallery>
			</div>
		{/if}
	</div>

	{#if updateAuthContext.userActionPermitted(article.user_id, user)}
		<AttachmentUploader on:triggerAttachmentUpload={handleArticleImageUpload} />
	{/if}

	<div class="mt-4">
		<form on:submit={onSubmit}>
			<Textarea on:change={handleInput} class="mb-4" placeholder="Write a comment...">
				<div slot="footer" class="flex items-center justify-between">
					<Button color="green" outline on:click={onSubmit} type="submit"><RocketLaunch /></Button>
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
				<Button outline size="xs" color="red" on:click={() => deleteComment(item.id)}><Trash /></Button>
			{/if}
		</Listgroup>
	{/if}
{/if}

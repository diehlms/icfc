<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
  import { Textarea, Button, Hr, Listgroup, Dropzone } from 'flowbite-svelte';
  import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { type articleIn, type commentIn } from '$lib/client';
  import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';

  let article: any;
  let loading: boolean = true;
	let comment: string = "Write a comment..."
	let formData = new FormData();
	let payload: any = {};
  let editArticleForm: FormInput[];
	let files = {
		accepted: [],
		rejected: []
	};

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

  const handleFilesSelect = (e: any) => {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		payload.files = files;
	}

  const handleArticleImageUpload = (event: any) => {
		formData.append('gallery[image]', event.detail.files.accepted[0]);
		formData.append('gallery[caption]', event.detail.caption)
		formData.append('gallery[user_id]', '1')

		client.imageUploadClient?.uploadImage('v1/galleries/', formData).then(res => {
			toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Images added!',
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

  const onSubmit = () => {
    const Comment: commentIn = {
      content: comment,
      article_id: data.id,
      user_id: user.id
    }

    client.restClient?.comments
      .postV1Comments(Comment)
      .then((data) => {
        toastStore.update((prevValue) => ({
          ...prevValue,
          isOpen: true,
          toastMessage: 'Comment Added',
          type: ToastTypes.success
        }));
        article.comments.push(data)
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
  }


	const deleteComment = (id) => {
		loading = true
		client.restClient?.comments
			.deleteV1Comments(id)
			.then(_ => {
				loading = false
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Comment deleted",
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
	}

  const deleteArticle = (id) => {
		loading = true
		client.restClient?.articles
			.deleteV1Articles(id)
			.then(_ => {
				loading = false
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Article deleted",
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
	}

  const editArticle = (event: any) => {
		loading = true
  
    let articleUpdatePayload: articleIn = {
      title: event.detail.title,
      content: event.detail.content
    }

		client.restClient?.articles
			.putV1Articles(article.id, {article: articleUpdatePayload})
			.then(_ => {
				loading = false
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Article updated",
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
	}

  const handleInput = (event: any) => {
		const { value } = event.target;
		comment = value;
	}

  const user = get(userStore)
  const client = get(clientStore);

  $: article;
</script>

{#if loading}
  <Loader />
{:else if article}
  <h1>{article.title}</h1>
  <span>Posted: {article.createdarticleat}</span>
  <span>Updated: {article.updatedarticleat}</span>
  <Hr />

  {#if updateAuthContext.userActionPermitted(article.user_id, user.id)}
    <Button on:click={() => deleteArticle(article.id)}>Delete Article</Button>
    <AddEdit
      on:triggerModalFormSubmit={editArticle}
      form={editArticleForm}
      openDrawerLabel="Edit article"
      displayAsButton={true}
    />
  {/if}
  <div class="flex">
    <div class="w-2/3 p-4">
      <div class="article-content p-6">
        <pre>{article.content}</pre>
      </div>
    </div>

    {#if !!article.image.url}
      <div class="w-1/3 p-4">
        <img src='http://icfc.localhost:3010{article.image.url}' />
      </div>
    {/if}
  </div>
    
  {#if updateAuthContext.userActionPermitted(article.user_id, user.id)}
    <div class="my-3">
      Add/Update Image
      <Dropzone on:drop={handleFilesSelect} />
      <ol>
        {#each files.accepted as item}
          <li>{item.name}</li>
        {/each}
      </ol>
    </div>
    {#if files.length > 0}
      <div class="my-3">
        <Button on:click={handleArticleImageUpload}>Upload</Button>
      </div>
    {/if}
  {/if}

  <form on:submit={onSubmit}>
    <Textarea on:change={handleInput} class="mb-4" placeholder="Write a comment...">
      <div slot="footer" class="flex items-center justify-between">
        <Button on:click={onSubmit} type="submit">Post comment</Button>
      </div>
    </Textarea>
  </form>

  <Hr />

  <h2 class="mb-2">Comments</h2>

  {#if article.comments && article.comments.length > 0}
    <Listgroup items={article.comments} let:item class="w-full p-3">
      {#if updateAuthContext.userActionPermitted(item.user_id, user.id)}
        <Button on:click={() => deleteComment(item.id)}>Delete Comment</Button>
      {/if}
      {item?.created_at} | {item.updated_at} | By: {item.user_id}
      {item?.content}
    </Listgroup>
  {/if}
{/if}

<style>

</style>
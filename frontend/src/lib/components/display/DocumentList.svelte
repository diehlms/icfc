<script lang="ts">
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { Tabs, TabItem, Listgroup, Badge } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { toTitleCase } from '$lib/components/services/textFormatting';
	import type { documentOut } from '$lib/client';
	import { deleteEntity } from '../services/crud';
	import { hotSwapProductionUris } from '../services/imageUtils';

	export let foldersToShow: string[] = [];

	let createDocumentForm = new FormBuilder().text('title').text('folder').attachment('document').build();
	let documents: documentOut[] = [];
	let documentGroups = {};
	let loading = true;
	let documentFormData = new FormData();

	const deleteDocument = (id: string) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Document',
			client.restClient?.documents.deleteV1Documents.bind(client.restClient.documents)
		)
		loading = false;
	};

	const postDocument = (event: any) => {
		documentFormData.append('document', event?.detail?.files.accepted[0]);
		documentFormData.append('document_folder', event.detail.folder);
		documentFormData.append('document_title', event.detail.title);
		documentFormData.append('user_id', user.id);

		client.imageUploadClient
			?.uploadImage(`/v1/documents`, documentFormData)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Document added!',
					type: ToastTypes.success
				}));
			})
			.catch((err: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: err,
					type: ToastTypes.error
				}));
			});
	};

	const downloadDocument = async (url: string, title: string) => {
    try {
      const response = await fetch(hotSwapProductionUris(url));
      if (!response.ok) {
				console.error(response)
        throw new Error('Failed to download document');
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = title;
      link.click();
      toastStore.update((prevValue) => ({
        ...prevValue,
        isOpen: true,
        toastMessage: 'Document downloaded!',
        type: ToastTypes.success,
      }));
    } catch (error: any) {
      toastStore.update((prevValue) => ({
        ...prevValue,
        isOpen: true,
        toastMessage: error.message,
        type: ToastTypes.error,
      }));
    }
  };

	onMount(() => {
		client.restClient?.documents
			.getV1Documents()
			.then((data) => {
				documents = data;
				groupDocumentsByFolder();
			})
			.catch((err) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: err,
					type: ToastTypes.error
				}));
			});
	});

	const groupDocumentsByFolder = () => {
		documentGroups = documents.reduce((acc: any, doc: any) => {
			(acc[doc.document_folder] = acc[doc.document_folder] || []).push(doc);
			return acc;
		}, {});
	};

	const client = get(clientStore);
	const user = get(userStore);

	$: documents;
</script>

<AddEdit
	on:triggerModalFormSubmit={postDocument}
	form={createDocumentForm}
	openDrawerLabel="Add Document"
/>

<Tabs>
	{#each Object.entries(documentGroups) as [folderName, docs]}
		{#if foldersToShow.indexOf(folderName) > -1}
			<TabItem title={toTitleCase(folderName)} {open}>
				<Listgroup items={docs} let:item class="mb-4">
					<span class="text-sm text-gray-500 dark:text-gray-400">
						<a href={item.document.url}>{item.document_title}</a>
						<div class="float-right">
							<Badge color="blue">
								<span on:click={() => downloadDocument(item.document.url, item.document_title)}>Download</span></Badge>
								<Badge color="red"><span on:click={() => deleteDocument(item.id)}>Delete</span>
								</Badge>
						</div>
					</span>
				</Listgroup>
			</TabItem>
		{/if}
	{/each}
</Tabs>

<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { Gallery } from 'flowbite-svelte';
	import updateAuthContext from '$lib/components/services/auth';
	import { onMount } from 'svelte';
	import InteractiveImage from '$lib/components/display/InteractiveImage.svelte';
	import { hotSwapProductionUris } from '$lib/components/services/imageUtils';
	import { type galleryOut, type baseModel } from '$lib/client';
	import { deleteEntity } from '$lib/components/services/crud';

	let createImageForm = new FormBuilder().text('caption').attachment('image').build();
	let loading: boolean = false;
	let images: any = [];
	let formData = new FormData();
	let isFetchingMore = false;

	const handleSubmit = (event: any) => {
		formData.append('gallery[image]', event.detail.files.accepted[0]);
		formData.append('gallery[caption]', event.detail.caption);
		formData.append('gallery[user_id]', user.id);

		client.imageUploadClient
			?.uploadImage('/v1/galleries/', formData)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Images added!',
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

	const fetchImages = () => {
		loading = true;
		client.restClient?.galleries
			.getV1Galleries()
			.then((data: galleryOut[]) => {
				const newImages = data.map((_: galleryOut) => ({
					id: _.id,
					user_id: _.user_id,
					alt: _.caption,
					src: hotSwapProductionUris(_.image.url)
				}));

				images = [...images, ...newImages];
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
			});
	};

	const deletePhoto = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Photo',
			client.restClient?.galleries.deleteV1Galleries.bind(client.restClient?.galleries)
		);
		loading = false;
	};

	const user = get(userStore);
	const client = get(clientStore);

	onMount(() => {
		fetchImages();
	});
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createImageForm}
	openDrawerLabel="Add new pictures"
/>

{#if images && images.length > 0}
	<Gallery class="grid-cols-3 gap-4" items={images} let:item>
		<InteractiveImage
			on:handleDelete={() => deletePhoto(item.id)}
			{item}
			isOwner={() => updateAuthContext.userActionPermitted(item.id, user.id)}
		/>
	</Gallery>
{/if}

{#if isFetchingMore}
	<div class="flex items-center justify-center py-4">
		<p>Loading more images...</p>
	</div>
{/if}

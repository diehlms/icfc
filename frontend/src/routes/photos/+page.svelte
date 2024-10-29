<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { Gallery, Button } from 'flowbite-svelte';
	import updateAuthContext from '$lib/components/services/auth';
	import { onMount } from 'svelte';
	import { ArrowsPointingOut, Trash, XCircle } from 'svelte-heros-v2';

	let createImageForm = new FormBuilder().name('caption').attachment().build();
	let loading: boolean = false;
	let images: any = [];
	let formData = new FormData();
	let selectedImage: any = null; // State to track selected image for full-page view
	let currentPage = 1; // Track the current page of images
	let totalPages = 1; // Total pages returned by API
	let isFetchingMore = false; // Track if more images are being fetched

	// Function to handle submitting new image
	const handleSubmit = (event: any) => {
		formData.append('gallery[image]', event.detail.files.accepted[0]);
		formData.append('gallery[caption]', event.detail.caption);
		formData.append('gallery[user_id]', user.id);

		client.imageUploadClient
			?.uploadImage('v1/galleries/', formData)
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

	const fetchImages = (page: number) => {
		loading = true;
		client.restClient?.galleries
			.getV1Galleries(page)
			.then((data) => {
				const newImages = data.map((_: any) => ({
					id: _.id,
					user_id: _.user_id,
					alt: _.caption,
					src: `http://icfc.localhost:3010${_.image.url}`
				}));

				images = [...images, ...newImages];
				loading = false;
				totalPages = data.total_pages;
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

	const deletePhoto = (id) => {
		client.restClient?.galleries
			.deleteV1Galleries(id)
			.then((_) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Photo deleted!',
					type: ToastTypes.success
				}));
				images = images.filter((img) => img.id !== id);
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
	};

	const user = get(userStore);
	const client = get(clientStore);

	const openFullPageImage = (image: any) => {
		selectedImage = image;
	};

	const closeFullPageImage = () => {
		selectedImage = null;
	};

	onMount(() => {
		fetchImages(currentPage);
	});
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createImageForm}
	openDrawerLabel="Add new pictures"
/>

{#if images && images.length > 0}
	<Gallery class="grid-cols-3 gap-4" items={images} let:item>
		<div class="group relative cursor-pointer overflow-hidden rounded-lg">
			<img
				src={item.src}
				alt={item.alt}
				class="h-auto w-full transform object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
			/>
			<div
				class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			>
				<Button
					color="dark"
					size="sm"
					class="!flex items-center gap-2 bg-black/70 px-4 py-2 text-white backdrop-blur-sm transition-transform hover:bg-black/80"
					on:click={() => openFullPageImage(item)}
				>
					<ArrowsPointingOut />
					Open
				</Button>

				{#if updateAuthContext.userActionPermitted(item.user_id, user)}
					<Button
						color="red"
						size="sm"
						class="!flex items-center gap-2 bg-red-500/70 px-4 py-2 text-white backdrop-blur-sm transition-transform hover:bg-red-600/80"
						on:click={() => deletePhoto(item.id)}
					>
						<Trash />
						Delete
					</Button>
				{/if}
			</div>
			<div
				class="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white backdrop-blur-sm"
			>
				{item.alt}
			</div>
		</div>
	</Gallery>
{/if}

{#if selectedImage}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
		<div class="relative">
			<img src={selectedImage.src} alt={selectedImage.alt} class="max-h-screen max-w-full" />
			<Button outline class="absolute right-4 top-4" on:click={closeFullPageImage}><XCircle /></Button>
		</div>
	</div>
{/if}

{#if isFetchingMore}
	<div class="flex items-center justify-center py-4">
		<p>Loading more images...</p>
	</div>
{/if}

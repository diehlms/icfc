<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { Gallery, Button, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import updateAuthContext from '$lib/components/services/auth';
	import BreadCrumb from '$lib/components/display/BreadCrumb.svelte';
	import { onMount } from 'svelte';

	let createImageForm = new FormBuilder().name('caption').attachment().build();
	let loading: boolean = false;
	let images = [];
	let formData = new FormData();
	let selectedImage = null; // State to track selected image for full-page view
	let currentPage = 1; // Track the current page of images
	let totalPages = 1;  // Total pages returned by API
	let isFetchingMore = false; // Track if more images are being fetched

	// Function to handle submitting new image
	const handleSubmit = (event) => {
		formData.append('gallery[image]', event.detail.files.accepted[0]);
		formData.append('gallery[caption]', event.detail.caption);
		formData.append('gallery[user_id]', '1');

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
		});
	};

	// Fetch images for a specific page
	const fetchImages = (page) => {
		loading = true;
		client.restClient?.galleries.getV1Galleries({ page }).then(data => {
				const newImages = data.map(_ => ({
					id: _.id,
					user_id: _.user_id,
					alt: _.caption,
					src: `http://icfc.localhost:3010${_.image.url}`
				}));

				images = [...images, ...newImages]; // Append new images to existing ones
				loading = false;
				totalPages = data.total_pages; // Assuming your API returns the total pages count
		}).catch(error => {
			loading = false;
			toastStore.update(prevValue => ({
				...prevValue,
				isOpen: true,
				toastMessage: error,
				type: ToastTypes.error
			}))
		})
	};

	// Function to handle the delete photo action
	const deletePhoto = (id) => {
		client.restClient?.galleries
			.deleteV1Galleries(id)
			.then(_ => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Photo deleted!",
					type: ToastTypes.success
				}));
				images = images.filter(img => img.id !== id); // Remove the deleted photo from the images list
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

	const openFullPageImage = (image) => {
		selectedImage = image; // Set the clicked image as selected
	};

	const closeFullPageImage = () => {
		selectedImage = null; // Clear selected image to close the full-page view
	};

	// Scroll event listener to detect when user reaches the bottom
	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetchingMore && currentPage < totalPages) {
			isFetchingMore = true;
			currentPage++;
			fetchImages(currentPage).finally(() => {
				isFetchingMore = false;
			});
		}
	};

	// Attach the scroll event listener and fetch initial images
	onMount(() => {
		fetchImages(currentPage); // Initial fetch
		window.addEventListener('scroll', handleScroll); // Listen for scroll events

		return () => {
			window.removeEventListener('scroll', handleScroll); // Clean up scroll listener
		};
	});
</script>

<BreadCrumb localPathName="photos" />

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createImageForm}
	openDrawerLabel="Add new pictures"
/>

{#if images && images.length > 0}
	<Gallery class="gap-4 grid-cols-3" items={images} let:item>
		<div class="ring-4 ring-red-600 dark:ring-red-400 p-1 cursor-pointer">
			<img on:click={() => openFullPageImage(item)} src={item.src} alt={item.alt} class="h-auto max-w-full" />
			<span>{item.alt}</span>
			{#if updateAuthContext.userActionPermitted(item.user_id, user.id)}
				<Button on:click={() => deletePhoto(item.id)}>Delete Photo</Button>
			{/if}
		</div>
	</Gallery>
{/if}

{#if selectedImage}
	<!-- Full-page view when an image is selected -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
		<div class="relative">
			<img src={selectedImage.src} alt={selectedImage.alt} class="max-w-full max-h-screen" />
			<Button class="absolute top-4 right-4" on:click={closeFullPageImage}>Close</Button>
		</div>
	</div>
{/if}

{#if isFetchingMore}
	<!-- Loading spinner when fetching more images -->
	<div class="flex justify-center items-center py-4">
		<p>Loading more images...</p>
	</div>
{/if}

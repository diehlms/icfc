<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Card, Button, Label, Input, Listgroup, Spinner, Carousel, Hr } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';
	import type { cabinDateIn } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import AttachmentUploader from '$lib/components/display/AttachmentUploader.svelte';
	import { Trash } from 'svelte-heros-v2';

	export let data: any;

	let loading: boolean = true;
	let cabin: any;
	let cabinDates: any;
	let images: any = [];
	let newStartDate: string = '';
	let newEndDate: string = '';
	let editCabinForm: FormInput[];
	let attachmentFormData = new FormData();

	const fetchData = () => {
		client.restClient?.cabins
			.getV1Cabins1(data.id)
			.then((data) => {
				if (!!data.cabin_attachments) {
					data.cabin_attachments.forEach((attachment: any) => {
						if (!!attachment.image.url) {
							images.push({
								src: `http://icfc.localhost:3010/${attachment.image.url}`,
								alt: `Image of ${data.name} cabin`
							});
						}
					});
				}
				cabinDates = data.cabindates;
				cabin = data;
				editCabinForm = new FormBuilder()
					.name()
					.bedrooms()
					.washerdryer()
					.dock()
					.price_per_week()
					.price_per_day()
					.description()
					.build(cabin);
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

	const client = get(clientStore);
	const user = get(userStore);

	const addNewDate = () => {
		const newCabinDate: cabinDateIn = {
			cabin_id: cabin.id,
			startdate: newStartDate,
			enddate: newEndDate
		};

		client.restClient?.cabinDates
			.postV1CabinDates({
				cabindate: newCabinDate
			})
			.then((_) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Cabin date added',
					type: ToastTypes.error
				}));
				fetchData();
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

	const deleteCabin = (id) => {
		loading = true;
		client.restClient?.cabins
			.deleteV1Cabins(id)
			.then((_) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Cabin deleted',
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

	const editCabin = (event: any) => {
		loading = true;

		let cabinUpdatePayload: cabinIn = {
			user_id: user.id,
			name: event.detail.name,
			bedrooms: event.detail.bedrooms,
			washerdryer: event.detail.washerdryer,
			dock: event.detail.dock,
			price_per_week: event.detail.price_per_week,
			price_per_day: event.detail.price_per_day,
			description: event.detail.description
		};

		client.restClient?.cabins
			.putV1Cabins(cabin.id, { cabin: cabinUpdatePayload })
			.then((_) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Cabin updated',
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

	const postCabinAttachments = (payload: any) => {
		if (payload?.detail?.files.accepted.length > 1) {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: 'Can only add 1 image per cabin at this time',
				type: ToastTypes.error
			}));
		}

		attachmentFormData.append('image', payload?.detail?.files.accepted[0]);
		attachmentFormData.append('cabin_id', cabin.id);

		client.imageUploadClient
			?.uploadImage(`v1/cabin_attachments`, attachmentFormData)
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

	$: cabin;
</script>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<Spinner size="12" />
	</div>
{:else if cabin}
	<div class="container mx-auto max-w-7xl p-4">
		<div class="flex flex-col gap-4 lg:flex-row">
			<div class="w-full lg:w-3/4">
				<Card>
					<h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{cabin.name}
						{#if updateAuthContext.userActionPermitted(cabin.user_id, user)}
							<Button color="red" size="xs" on:click={() => deleteCabin(cabin.id)}><Trash /></Button>
							<AddEdit
								on:triggerModalFormSubmit={editCabin}
								form={editCabinForm}
								openDrawerLabel=""
								displayAsButton={true}
							/>
						{/if}
					</h5>
					<Timestamps textAlign="left" model={cabin} />
					<Hr />
					<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-1">
						<div>
							<p class="mb-2">
								<span class="font-semibold">Price per week:</span>
								{#if !!cabin.price_per_week}
									${cabin.price_per_week}
								{:else}
									Price not Available
								{/if}
							</p>
							<p class="mb-2">
								<span class="font-semibold">Price per day:</span>
								{#if !!cabin.price_per_day}
									${cabin.price_per_day}
								{:else}
									Price not Available
								{/if}
							</p>
							<p class="mb-2">
								<span class="font-semibold">Washer Dryer:</span>
								{cabin.washerdryer ? 'Yes' : 'No'}
							</p>
							<p class="mb-2">
								<span class="font-semibold">Dock:</span>
								{cabin.dock ? 'Yes' : 'No'}
							</p>
							<p class="mb-2"><span class="font-semibold">Bedrooms:</span> {cabin.bedrooms}</p>
						</div>
						<div>
							<p class="mb-2">
								<span class="font-semibold">Description:</span>
								{cabin.description}
							</p>
						</div>
						<div>
							<h6 class="mb-2 text-lg font-semibold">Dates of Availability:</h6>
							{#if cabinDates.length > 0}
								<Listgroup items={cabinDates} let:item class="mb-4">
									{new Date(item.startdate).toLocaleDateString()} to {new Date(
										item.enddate
									).toLocaleDateString()}
									{#if updateAuthContext.userActionPermitted(cabin.user_id, user)}
										<Button outline color="red" size="xs" class="float-right"><Trash /></Button>
									{/if}
								</Listgroup>
							{/if}
							{#if updateAuthContext.userActionPermitted(cabin.user_id, user)}
								<div class="mb-4">
									<Label for="newStartDate" class="mb-2">New Start Date</Label>
									<Input id="newStartDate" type="date" bind:value={newStartDate} />
								</div>
								<div class="mb-4">
									<Label for="newEndDate" class="mb-2">New End Date</Label>
									<Input id="newEndDate" type="date" bind:value={newEndDate} />
								</div>
								<Button outline color="green" on:click={addNewDate}>Add New Availability</Button>
							{/if}
						</div>
					</div>
					{#if updateAuthContext.userActionPermitted(cabin.user_id, user)}
						<AttachmentUploader on:triggerAttachmentUpload={postCabinAttachments} />
					{/if}
				</Card>
			</div>
			<div class="w-full lg:w-1/2">
				<div class="sticky top-4">
					<Carousel {images} let:Controls>
						<Controls />
					</Carousel>
				</div>
			</div>
		</div>
	</div>
{/if}

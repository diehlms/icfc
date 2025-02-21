<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import {
		Card,
		Badge,
		Button,
		Label,
		Input,
		Listgroup,
		Spinner,
		Gallery,
		Hr
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';
	import type { cabinAttachmentOut, cabinDateIn, cabinOut, cabinUpdate } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import AttachmentUploader from '$lib/components/display/AttachmentUploader.svelte';
	import { Trash } from 'svelte-heros-v2';
	import InteractiveImage from '$lib/components/display/InteractiveImage.svelte';
	import { hotSwapProductionUris } from '$lib/components/services/imageUtils';
	import { createEntity, deleteEntity, editEntity } from '$lib/components/services/crud';
	import { goto } from '$app/navigation';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';

	export let data: any;

	let loading: boolean = true;
	let cabin: cabinOut | undefined;
	let cabinDates: any;
	let images: any = [];
	let newStartDate: string = '';
	let newEndDate: string = '';
	let editCabinForm: FormInput[];
	let attachmentFormData = new FormData();

	const fetchData = () => {
		client.restClient?.cabins
			.getV1Cabins1(data.id)
			.then((data: cabinOut) => {
				if (!!data.cabin_attachments && data.cabin_attachments.length > 0) {
					data.cabin_attachments.forEach((attachment: cabinAttachmentOut[]) => {
						if (!!attachment.image.url) {
							images.push({
								src: hotSwapProductionUris(attachment.image.url),
								alt: '',
								id: attachment.id
							});
						}
					});
				}
				cabinDates = data.cabindates;
				cabin = data;
				editCabinForm = new FormBuilder()
					.text('name')
					.number('bedrooms')
					.checkbox('washerdryer')
					.checkbox('dock')
					.number('price_per_week')
					.number('price_per_week')
					.richText('description')
					.build(cabin);
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};

	onMount(() => {
		fetchData();
	});

	const client = get(clientStore);
	const user = get(userStore);

	const addNewDate = () => {
		loading = true;
		const newCabinDate: cabinDateIn = {
			cabin_id: cabin.id,
			startdate: newStartDate,
			enddate: newEndDate
		};
		createEntity(
			{
				cabindate: newCabinDate,
				user_id: user.id
			},
			'Cabin date',
			client.restClient?.cabinDates.postV1CabinDates.bind(client.restClient?.cabinDates)
		).finally(() => fetchData());
		loading = false;
	};

	const deleteCabin = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Cabin',
			client.restClient?.cabins.deleteV1Cabins.bind(client.restClient?.cabins)
		);
		loading = false;
		goto('/cabins');
	};

	const deleteCabinDate = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Cabin date',
			client.restClient?.cabinDates.deleteV1CabinDates.bind(client.restClient?.cabinDates)
		).finally(() => fetchData());
	};

	const deleteCabinAttachment = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Image',
			client.restClient?.cabinAttachments.deleteV1CabinAttachments.bind(
				client.restClient?.cabinAttachments
			)
		).finally(() => fetchData());
	};

	const editCabin = (event: any) => {
		loading = true;
		const cabinUpdatePayload: cabinUpdate = {
			name: event.detail.name,
			bedrooms: event.detail.bedrooms,
			washerdryer: event.detail.washerdryer,
			dock: event.detail.dock,
			price_per_week: event.detail.price_per_week,
			price_per_day: event.detail.price_per_day,
			description: event.detail.description
		};
		editEntity(
			cabin.id as number,
			{ cabin: cabinUpdatePayload, user_id: user.id as number },
			'Cabin',
			client.restClient?.cabins.putV1Cabins.bind(client.restClient.cabins)
		).finally(() => fetchData());
	};

	const postCabinAttachments = (payload: any) => {
		loading = true;

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
		attachmentFormData.append('user_id', user.id);

		client.imageUploadClient
			?.uploadImage(`/v1/cabin_attachments`, attachmentFormData)
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

	$: cabin;
</script>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<Spinner size="12" />
	</div>
{:else if cabin}
	<div class="container mx-auto h-full max-w-7xl p-4">
		<div class="flex flex-col gap-4 lg:flex-row">
			<div class="w-full lg:w-3/4">
				<Card>
					<h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{cabin.name}
						{#if updateAuthContext.userActionPermitted(cabin.user.id, user)}
							<Button color="red" size="xs" on:click={() => deleteCabin(cabin.id)}><Trash /></Button
							>
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
								{@html cabin.description}
							</p>
						</div>
						<div>
							<h6 class="mb-2 text-lg font-semibold">Dates of Availability:</h6>
							{#if cabinDates.length > 0}
								<Listgroup items={cabinDates} let:item class="mb-4">
									<span>
										{new Date(item.startdate).toLocaleDateString()} to {new Date(
											item.enddate
										).toLocaleDateString()}
										{#if updateAuthContext.userActionPermitted(cabin.user.id, user)}
											<Badge color="red" size="xs" class="float-right">
												<span on:click={() => deleteCabinDate(item.id)}> Delete </span>
											</Badge>
										{/if}
									</span>
								</Listgroup>
							{/if}
							{#if updateAuthContext.userActionPermitted(cabin.user.id, user)}
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
					{#if updateAuthContext.userActionPermitted(cabin.user.id, user)}
						<AttachmentUploader on:triggerAttachmentUpload={postCabinAttachments} />
					{/if}
				</Card>
			</div>
			{#if images}
				<div class="w-full lg:w-1/2">
					<div class="sticky top-4">
						<Gallery class="grid-cols-1 gap-4" items={images} let:item>
							<InteractiveImage
								on:handleDelete={() => deleteCabinAttachment(item.id)}
								{item}
								isOwner={() => updateAuthContext.userActionPermitted(item.id, user.id)}
							/>
						</Gallery>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

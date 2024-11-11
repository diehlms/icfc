<script lang="ts">
	import Loader from '$lib/components/display/Loader.svelte';
	import { Button, Hr, Card } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import { Trash } from 'svelte-heros-v2';
	import type { eventUpdate } from '$lib/client';
	import { deleteEntity, editEntity } from '$lib/components/services/crud';

	let event: any;
	let loading: boolean = true;
	let editEventForm: FormInput[];

	export let data: any;

	const fetchData = () => {
		client.restClient?.events
			.getV1Events1(data.id)
			.then((data) => {
				event = data;
				editEventForm = new FormBuilder()
					.text('event_title')
					.text('location')
					.richText('description')
					.dateTime('start_time')
					.dateTime('end_time')
					.build(event);
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

	const deleteEvent = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Event',
			client.restClient?.events.deleteV1Events.bind(client.restClient?.events)
		);
		loading = false;
	};

	const editEvent = (payload: any) => {
		loading = true;
		let eventUpdatePayload: eventUpdate = {
			start_time: payload.detail.start_time,
			end_time: payload.detail.end_time,
			location: payload.detail.location,
			events: payload.detail.event_title,
			description: payload.detail.description
		};
		editEntity(
			event.id as number,
			{ event: eventUpdatePayload, user_id: user.id as number },
			'Event',
			client.restClient?.events.putV1Events.bind(client.restClient.events)
		);
		fetchData();
		loading = false;
	};

	const user = get(userStore);
	const client = get(clientStore);

	$: event;
</script>

{#if loading}
	<Loader />
{:else if event}
	<div class="flex items-center justify-center">
		<Card class="max-w-none mx-auto my-12 w-3/4 p-5">
			<div class="flex flex-col items-center">
				<h1 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
					{event.events}
				</h1>
				<Hr />
				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex flex-col space-y-4">
						<div>
							<p class="font-semibold">From:</p>
							<p>{event.start_time}</p>
						</div>
						<div>
							<p class="font-semibold">To:</p>
							<p>{event.end_time}</p>
						</div>
						<div>
							<p class="font-semibold">Location:</p>
							<p>{event.location}</p>
						</div>
					</div>
					<div>
						<p class="font-semibold">Description:</p>
						<p>{@html event.description}</p>
					</div>
				</div>
				<div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
					{#if updateAuthContext.userActionPermitted(event.user.id, user)}
						<Button color="red" outline on:click={() => deleteEvent(event.id)}><Trash /></Button>
						<AddEdit
							on:triggerModalFormSubmit={editEvent}
							form={editEventForm}
							openDrawerLabel=""
							displayAsButton={true}
						/>
					{/if}
				</div>
			</div>
			<hr class="my-4 border-gray-200 dark:border-gray-700" />
			<div class="space-y-3"></div>
			<Timestamps model={event} />
		</Card>
	</div>
{/if}

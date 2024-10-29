<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { eventIn } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	type CalendarEvent = {
		allDay: boolean;
		start: string;
		end: string;
		title: string;
		id: any;
	};

	let plugins = [TimeGrid, Interaction];
	let options = {
		view: 'timeGridWeek',
		events: [],
		eventClick: handleEventClick
	};

	function handleEventClick(info: any) {
		const eventId = info.event.id;
		goto(`${$page.url.pathname}/${eventId}`);
	}

	let loading: boolean = false;
	let createEventForm = new FormBuilder().events().location().fromDate().toDate().content().build();

	const handleSubmit = (event: any) => {
		const eventReq: eventIn = {
			user_id: user.id,
			events: event.detail.event,
			description: event.detail.description,
			location: event.detail.location,
			start_time: event.detail.fromDate,
			end_time: event.detail.toDate
		};

		client.restClient?.events
			.postV1Events(eventReq)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Event added!',
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

	onMount(() => {
		loading = true;
		client.restClient?.events
			.getV1Events()
			.then((data) => {
				options.events = data.map((event: any) => {
					const calendarEvent: CalendarEvent = {
						id: event.id,
						title: event.location,
						start: new Date(event.start_time).toISOString(),
						end: new Date(event.end_time).toISOString(),
						allDay: true
					};
					return calendarEvent;
				});
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
	});

	const client = get(clientStore);
	const user = get(userStore);
	$: options;
</script>

<AddEdit
	on:triggerModalFormSubmit={handleSubmit}
	form={createEventForm}
	openDrawerLabel="Add new event"
/>

<div class="w-11/12">
	<Calendar {plugins} {options} />
</div>

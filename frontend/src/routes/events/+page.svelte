<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { eventIn, eventOut } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { Button } from 'flowbite-svelte'

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
	let createEventForm = new FormBuilder()
		.text('event_title')
		.text('location')
		.richText('description')
		.dateTime('start_time')
		.dateTime('end_time')
		.build();
	let errors: any = undefined;

	const handleSubmit = (event: any) => {
		const eventReq: eventIn = {
			user_id: user.id as number,
			events: event.detail.event_title,
			description: event.detail.description,
			location: event.detail.location,
			start_time: event.detail.start_time,
			end_time: event.detail.end_time
		};

		client.restClient?.events
			.postV1Events({ event: eventReq })
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Event added!',
					type: ToastTypes.success
				}));
			})
			.catch((error: any) => {
				errors = processApiErrorsToString(error.body);
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: errors,
					type: ToastTypes.error
				}));
			});
	};

	const printCalendar = () => {
		window.print()
	}

	onMount(() => {
		loading = true;
		client.restClient?.events
			.getV1Events()
			.then((data: eventOut[]) => {
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
	{errors}
/>

<div class="h-full w-11/12 pb-10">
	<div class="calendar">
		<Calendar {plugins} {options} />
	</div>
	<div class="mt-5 not-printable">
		<Button color="blue" class="not-printable" on:click={printCalendar}>Print Calendar</Button>
	</div>
</div>

<style>
	@media print {
		body > * {
			display: none !important;
		}
		.calendar {
			display: block !important;
			width: 100vw;
			height: 80vh;
			margin: 0 auto;
			page-break-inside: avoid;
			transform: scale(0.8);
			transform-origin: top left;
		}
	}
</style>

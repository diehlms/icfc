<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { eventIn } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';

	type CalendarEvent = {
		allDay: boolean
		start: string
		end: string
		title: string
	}

	let plugins = [TimeGrid];
	let options = {
			view: 'timeGridWeek',
			events: [
					// your list of events
			]
	};

	// let _: eventIn[] = [];
	let loading: boolean = false;
	let createEventForm = new FormBuilder().location().fromDate().toDate().content().build()

	const handleSubmit = (event: any) => {
		const eventReq: eventIn = {
			events: "foobar",
			description: "foobar",
			user_id: user.id,
			location: event.detail.location,
			start_time: event.detail.fromDate,
			end_time: event.detail.toDate
		}

		client.restClient?.events.postV1Events(eventReq).then(res => {
			toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Event added!',
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

	onMount(() => {
		loading = true;
		client.restClient?.events
			.getV1Events()
			.then((data) => {
				console.log(data)
				// _ = data;
				options.events = data.map(event => {
					const calendarEvent: CalendarEvent = {
						title: event.location,
						start: event.start_time,
						end: event.end_time,
						allDay: true
					}
					return calendarEvent
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

	// $: _;
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
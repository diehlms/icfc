<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { eventIn } from '$lib/client';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder from '$lib/components/services/formBuilder';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        events: [
            // your list of events
        ]
    };

	let _: eventIn[] = [];
	let loading: boolean = false;
	let createEventForm = new FormBuilder().location().fromDate().toDate().content().build()

	onMount(() => {
		loading = true;
		client.restClient?.events
			.getV1Events()
			.then((data) => {
				_ = data;
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

	$: _;
</script>

<AddEdit
	form={createEventForm}
	openDrawerLabel="Add new event"
/>

<Calendar {plugins} {options} />

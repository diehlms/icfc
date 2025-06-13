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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  $: event;
</script>

{#if loading}
  <Loader />
{:else if event}
  <div class="flex items-center justify-center">
    <Card class="mx-auto my-12 w-1/2 max-w-none p-5">
	
      <div class="flex flex-col items-center">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.title} - {event.location}</h5>
        <Hr />
        <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-1">
          <div class="flex flex-col space-y-2">
            <div>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-400">From:</p>
              <p>{formatDate(event.start_time)}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-400">To:</p>
              <p>{formatDate(event.end_time)}</p>
            </div>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">Description:</p>
            <p class="text-md text-gray-700 dark:text-gray-300">{@html event.description}</p>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {#if updateAuthContext.userActionPermitted(event.user.id, user)}
            <Button size="xs" color="red" outline on:click={() => deleteEvent(event.id)}><Trash /></Button>
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
      <p class="mt-4 text-left text-xs text-gray-500">
        Posted by: {event.user.username} ({event.user.email})
      </p>
    </Card>
  </div>
{/if}
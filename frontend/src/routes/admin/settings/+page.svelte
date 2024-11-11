<script lang="ts">
	import type { campMessageOut } from '$lib/client';
	import Loader from '$lib/components/display/Loader.svelte';
	import { createEntity, deleteEntity } from '$lib/components/services/crud';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
  import { Badge, Button, FloatingLabelInput, Helper, Listgroup } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

  let campMessage: string = "";
  let messages: campMessageOut[] = []
  let loading: boolean = false;

  onMount(() => {
    client.restClient?.campMessages.getV1CampMessages()
    .then((res: campMessageOut[]) => {
      messages = res
    }).catch((error: any) => {
      toastStore.update((prevValue) => ({
        ...prevValue,
        isOpen: true,
        toastMessage: processApiErrorsToString(error.body),
        type: ToastTypes.error
      }));
    })
  })

  const handleCampMessage = (event: any) => {
    const { target } = event.detail
    campMessage = target
  }

  const sendCampMessage = () => {
    loading = true;
    createEntity({ user_id: user.id as number, message: campMessage }, 'Camp Message', client.restClient?.campMessages.postV1CampMessages.bind(client.restClient.campMessages))
    loading = false;
  }

  const expireCampMessage = (id: number) => {
    loading = true;
    deleteEntity(id, { user_id: user.id as number}, 'Camp Message', client.restClient?.campMessages.deleteV1CampMessages.bind(client.restClient.campMessages))
    loading = false;
  }

  const user = get(userStore)
  const client = get(clientStore)

  $: messages;
</script>

<h1>Settings</h1>

{#if loading}
  <Loader />
{:else}
  <div class="mb-4">
    <h3>Camp Messages:</h3>
    {#if messages.length > 0}
    <Listgroup items={messages} let:item class="mb-4">
      <span>
        {item.message}
        <Badge color={item.expired ? "gray" : "green"} size="xs" class="float-right">
          <span>{item.expired ? "Expired" : "Active"}</span>
        </Badge>
        <Badge color="red" size="xs" class="float-right">
          <span on:click={() => expireCampMessage(item.id)}>Expire</span>
        </Badge>
      </span>
    </Listgroup>
    {/if}
    <FloatingLabelInput style="outlined" id="camp_message" name="message" on:change={handleCampMessage} bind:value={campMessage} type="text" />
  </div>

  <Button on:click={sendCampMessage}>Send camp message</Button>
{/if}
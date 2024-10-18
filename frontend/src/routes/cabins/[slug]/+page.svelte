<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Card, Button, Label, Input, Listgroup, Spinner, Carousel } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
  import updateAuthContext from '$lib/components/services/auth';
	import type { cabinDateIn } from '$lib/client';

	let loading: boolean = true;
	let cabin: any;
  let cabinDates: any;
  let images: any = [];

  export let data: any;

  let newStartDate: string = '';
  let newEndDate: string = '';

  const fetchData = () => {
    client.restClient?.cabins
      .getV1Cabins1(data.id)
      .then((data) => {
        if (!!data.cabin_attachments) {
          data.cabin_attachments.forEach((attachment: any) => {
            images.push({
              'src': `http://icfc.localhost:3010/${attachment.image.url}`,
              'alt': `Image of ${data.name} cabin`
            })
          })
        }
        console.log(data)
        cabinDates = data.cabindates
        cabin = data;
      })
      .catch((error) => {
        toastStore.update((prevValue) => ({
          ...prevValue,
          isOpen: true,
          toastMessage: error,
          type: ToastTypes.error
        }));
      });
    loading = false
  }

	onMount(() => {
    fetchData();
	});

	const client = get(clientStore);
	const user = get(userStore)
  
  const addNewDate = () => {
    const newCabinDate: cabinDateIn = {
      cabin_id: cabin.id,
      startdate: newStartDate,
      enddate: newEndDate
    }

    client.restClient?.cabinDates
      .postV1CabinDates({
        cabindate: newCabinDate
      })
      .then(_ => {
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
    loading = false
  }

  $: cabin
</script>

{#if loading}
  <div class="flex justify-center items-center h-screen">
    <Spinner size="12" />
  </div>
{:else if cabin}
  <div class="container mx-auto p-4 max-w-7xl">
    <div class="flex flex-col lg:flex-row gap-4">
      <div class="w-full lg:w-3/4">
        <Card>
          <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cabin.name}</h5>
          {#if updateAuthContext.userActionPermitted(cabin.user_id, user.id)}
            <Button>Edit cabin</Button>
            <Button>Delete cabin</Button>
          {/if}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="mb-2"><span class="font-semibold">Price per week:</span> ${cabin.price_per_week}</p>
              <p class="mb-2"><span class="font-semibold">Price per day:</span> ${cabin.price_per_day}</p>
              <p class="mb-2"><span class="font-semibold">Washer Dryer:</span> {cabin.washerdryer ? 'Yes' : 'No'}</p>
              <p class="mb-2"><span class="font-semibold">Dock:</span> {cabin.dock ? 'Yes' : 'No'}</p>
              <p class="mb-2"><span class="font-semibold">Bedrooms:</span> {cabin.bedrooms}</p>
            </div>
            <div>
              <h6 class="mb-2 text-lg font-semibold">Dates of Availability:</h6>
              <Listgroup items={cabinDates} let:item class="mb-4">
                <div>
                  {#if updateAuthContext.userActionPermitted(cabin.user_id, user.id)}
                    <Button>Delete date</Button>
                  {/if}
                  {new Date(item.startdate).toLocaleDateString()} to {new Date(item.enddate).toLocaleDateString()}
                </div>
              </Listgroup>
              {#if updateAuthContext.userActionPermitted(cabin.user_id, user.id)}
                <div class="mb-4">
                  <Label for="newStartDate" class="mb-2">New Start Date</Label>
                  <Input id="newStartDate" type="date" bind:value={newStartDate} />
                </div>
                <div class="mb-4">
                  <Label for="newEndDate" class="mb-2">New End Date</Label>
                  <Input id="newEndDate" type="date" bind:value={newEndDate} />
                </div>
                <Button on:click={addNewDate}>Add New Availability</Button>
              {/if}
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-4">
            Created: {new Date(cabin.created_at).toLocaleDateString()} | 
            Updated: {new Date(cabin.updated_at).toLocaleDateString()}
          </p>
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
<script lang="ts">
  import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
  import { Card, Badge, Button, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';

  let loading: boolean = true;
  let rideshare: any;
  let editRideshareForm: FormInput[];

  export let data: any;

  onMount(() => {
    client.restClient?.rideshares
      .getV1Rideshares1(data.id)
      .then((data) => {
        rideshare = data;
      })
      .catch((error) => {
        toastStore.update((prevValue) => ({
          ...prevValue,
          isOpen: true,
          toastMessage: error,
          type: ToastTypes.error
        }));
      });
    client.restClient?.locationPoints.getV1LocationPoints().then((data: any) => {
			const selectOptions = data.map((_: any) => {
				return {
					value: _.id,
					name: _.location_name
				}
			})
			editRideshareForm = new FormBuilder().fromLocation(selectOptions).toLocation(selectOptions).offering().content().numberOfPassengers().build(rideshare);
		})

    loading = false;
  });

  const deleteRideshare = (id) => {
		client.restClient?.rideshares
			.deleteV1Rideshares(id)
			.then(_ => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Rideshare deleted!",
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
	}

  const editRideshare = (event: any) => {
		loading = true
  
    let rideshareUpdatePayload: rideshareIn = {
      title: event.detail.title,
      content: event.detail.content
    }

		client.restClient?.rideshares
			.putV1Rideshare(rideshare.id, {rideshare: rideshareUpdatePayload})
			.then(_ => {
				loading = false
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: "Rideshare updated",
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
	}

  const client = get(clientStore);
	const user = get(userStore)

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  $: rideshare
</script>

{#if loading}
  <div class="flex justify-center items-center h-screen">
    <Spinner size="12" />
  </div>
{:else if rideshare}
  <div class="container mx-auto p-4 max-w-3xl">
    <div class="flex flex-col md:flex-row gap-4 justify-between">
      <Card class="flex-1">
        <div class="flex justify-between items-start mb-4">
          <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rideshare Details
          </h5>
          <Badge color={rideshare.seeking ? "yellow" : "green"}>
            {rideshare.seeking ? "Seeking Ride" : "Offering Ride"}
          </Badge>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex items-center">
            <div>
              <p class="font-semibold">From:</p>
              <p>{rideshare.point_of_departure.location_name}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <p class="font-semibold">To:</p>
              <p>{rideshare.point_of_arrival.location_name}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex items-center">
            <div>
              <p class="font-semibold">Departure:</p>
              <p>{formatDate(rideshare.departing_at)}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <p class="font-semibold">Arrival:</p>
              <p>{formatDate(rideshare.arriving_at)}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <p><span class="font-semibold">Passengers:</span> {rideshare.number_of_passengers}</p>
        </div>

        {#if rideshare.additional_information}
          <div class="mb-4">
            <p class="font-semibold">Additional Information:</p>
            <p>{rideshare.additional_information}</p>
          </div>
        {/if}

        <div class="flex justify-end">
          {#if updateAuthContext.userActionPermitted(parseInt(rideshare.user_id), user.id)}
            <Button on:click={() => deleteRideshare(rideshare.id)}>Delete Ridehsare</Button>
            <AddEdit
              on:triggerModalFormSubmit={editRideshare}
              form={editRideshareForm}
              openDrawerLabel="Edit Rideshare"
              displayAsButton={true}
            />
          {/if}
          
          <Button>
            <a href={`mailto:${rideshare}`}>
              Contact User
            </a>
          </Button>
        </div>
      </Card>

      <Card class="flex-1">
        <iframe 
          src='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1459440.1988828832!2d-80.56660371920148!3d44.403018062644065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x882b394ac02dd491%3A0xb41d5de9c4030ec5!2sToronto%20Pearson%20International%20Airport%2C%20Silver%20Dart%20Drive%2C%20Mississauga%2C%20ON%2C%20Canada!3m2!1d43.6777176!2d-79.6248197!4m5!1s0x4d2af89d9f168371%3A0xf170c239ee53f14c!2sMacTier%2C%20ON%2C%20Canada!3m2!1d45.139272999999996!2d-79.771827!5e0!3m2!1sen!2sus!4v1572568118601!5m2!1sen!2sus' 
          height='300px' 
          allowFullScreen={true}
          class="w-full"
          title="traffic-map"
          >
        </iframe>
      </Card>
    </div>

    <p class="text-xs text-gray-500 text-center mt-4">
      Created: {new Date(rideshare.created_at).toLocaleDateString()} | 
      Last Updated: {new Date(rideshare.updated_at).toLocaleDateString()}
    </p>
  </div>
{/if}

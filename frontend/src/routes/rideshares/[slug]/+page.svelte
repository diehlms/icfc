<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Card, Badge, Button, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';
	import AddEdit from '$lib/components/display/AddEdit.svelte';
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import { Trash } from 'svelte-heros-v2';
	import { formatDate } from '$lib/components/services/textFormatting';
	import type { locationPointOut, rideshareOut, rideshareUpdate } from '$lib/client';
	import { deleteEntity, editEntity } from '$lib/components/services/crud';
	import { goto } from '$app/navigation';

	let loading: boolean = true;
	let rideshare: rideshareOut;
	let editRideshareForm: FormInput[];

	export let data: any;

	const fetchData = () => {
		client.restClient?.rideshares
			.getV1Rideshares1(data.id)
			.then((data: rideshareOut) => {
				rideshare = data;
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
				client.restClient?.locationPoints.getV1LocationPoints().then((data: locationPointOut[]) => {
					const selectOptions = data.map((_: locationPointOut) => {
						return {
							value: _.id,
							name: _.location_name
						};
					});
					editRideshareForm = new FormBuilder()
						.select(selectOptions, 'point_of_departure')
						.select(selectOptions, 'point_of_arrival')
						.checkbox('seeking')
						.richText('additional_information')
						.number('number_of_passengers')
						.dateTime('arriving_at')
						.dateTime('departing_at')
						.build(rideshare);
				});
			});

		loading = false;
	};

	onMount(() => {
		fetchData();
	});

	const deleteRideshare = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Rideshare',
			client.restClient?.rideshares.deleteV1Rideshares.bind(client.restClient?.rideshares)
		).finally(() => goto('/rideshares'));;
		loading = false;
	};

	const editRideshare = (event: any) => {
		loading = true;
		const rideshareUpdatePayload: rideshareUpdate = {
			seeking: event.detail.seeking,
			point_of_arrival_id: event.detail.point_of_arrival,
			point_of_departure_id: event.detail.point_of_departure,
			number_of_passengers: event.detail.number_of_passengers,
			additional_information: event.detail.additional_information,
			departing_at: event.detail.departing_at,
			arriving_at: event.detail.arriving_at
		};
		editEntity(
			rideshare.id as number,
			{ rideshare: rideshareUpdatePayload, user_id: user.id as number },
			'Rideshare',
			client.restClient?.rideshares.putV1Rideshares.bind(client.restClient?.rideshares)
		);
		fetchData();
		loading = false;
	};

	const client = get(clientStore);
	const user = get(userStore);

	$: rideshare;
</script>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<Spinner size="12" />
	</div>
{:else if rideshare}
	<div class="container mx-auto max-w-3xl p-4">
		<div class="flex flex-col justify-between gap-4 md:flex-row">
			<Card class="flex-1">
				<div class="mb-4 flex items-start justify-between">
					<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Rideshare Details
					</h5>
					<Badge color={rideshare.seeking ? 'yellow' : 'green'}>
						{rideshare.seeking ? 'Seeking Ride' : 'Offering Ride'}
					</Badge>
				</div>

				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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

				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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

				<div class="mb-4 flex items-center">
					<p><span class="font-semibold">Passengers:</span> {rideshare.number_of_passengers}</p>
				</div>

				{#if rideshare.additional_information}
					<div class="mb-4">
						<p class="font-semibold">Additional Information:</p>
						<p>{@html rideshare.additional_information}</p>
					</div>
				{/if}

				<div class="flex justify-end">
					{#if updateAuthContext.userActionPermitted(parseInt(rideshare.user_id), user)}
						<Button
							class="mr-3"
							color="red"
							outline
							size="sm"
							on:click={() => deleteRideshare(rideshare.id)}><Trash /></Button
						>
						<AddEdit
							on:triggerModalFormSubmit={editRideshare}
							form={editRideshareForm}
							openDrawerLabel="Edit Rideshare"
							displayAsButton={true}
						/>
					{/if}
					<Button class="ml-3" outline color="blue" size="sm">
						<a href={`mailto:${rideshare.user.email}`}>Contact User: {rideshare.user.email}</a>
					</Button>
				</div>
			</Card>

			<Card class="flex-1">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1459440.1988828832!2d-80.56660371920148!3d44.403018062644065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x882b394ac02dd491%3A0xb41d5de9c4030ec5!2sToronto%20Pearson%20International%20Airport%2C%20Silver%20Dart%20Drive%2C%20Mississauga%2C%20ON%2C%20Canada!3m2!1d43.6777176!2d-79.6248197!4m5!1s0x4d2af89d9f168371%3A0xf170c239ee53f14c!2sMacTier%2C%20ON%2C%20Canada!3m2!1d45.139272999999996!2d-79.771827!5e0!3m2!1sen!2sus!4v1572568118601!5m2!1sen!2sus"
					height="300px"
					allowFullScreen={true}
					class="w-full"
					title="traffic-map"
				>
				</iframe>
			</Card>
		</div>

		<p class="mt-4 text-center text-xs text-gray-500">
			Created: {new Date(rideshare.created_at).toLocaleDateString()} | Last Updated: {new Date(
				rideshare.updated_at
			).toLocaleDateString()}
		</p>
	</div>
{/if}

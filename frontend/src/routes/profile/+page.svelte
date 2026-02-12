<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Card, Avatar, Badge, Spinner, Button } from 'flowbite-svelte';
	import { Envelope, Phone, User } from 'svelte-heros-v2';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { editEntity } from '$lib/components/services/crud';
	import type { userUpdate } from '$lib/client';

	let loading: boolean = true;
	let profile: any;
	let editMode: boolean = false;

	onMount(() => {
		fetchData();
	});

	const editProfile = () => {
		loading = true;
		const profileUpdatePayload: userUpdate = {
			firstname: profile.firstname,
			lastname: profile.lastname,
			username: profile.username,
			phone_number: profile.phone_number
		};
		editEntity(
			user.id,
			{ user: profileUpdatePayload, user_id: user.id as number },
			'User',
			client.restClient?.users.putV1Users.bind(client.restClient.users)
		).finally(() => {
			fetchData();
			editMode = false;
		});
	};

	const user = get(userStore);
	const client = get(clientStore);

	function fetchData() {
		client.restClient?.users
			.getV1Users1(user.id)
			.then((res) => {
				profile = res;
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body).message,
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="flex items-center justify-center">
	{#if loading}
		<Spinner size="12" />
	{:else if profile}
		<Card class="w-full max-w-md">
			<div class="flex flex-col items-center">
				<Avatar size="xl" class="mb-3" />
				{#if editMode}
					<input
						class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
						bind:value={profile.firstname}
						placeholder="First Name"
					/>
					<input
						class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
						bind:value={profile.lastname}
						placeholder="Last Name"
					/>
					<input
						class="text-sm text-gray-500 dark:text-gray-400"
						bind:value={profile.username}
						placeholder="Username"
					/>
				{:else}
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
						{profile.firstname}
						{profile.lastname}
					</h5>
					<span class="text-sm text-gray-500 dark:text-gray-400">@{profile.username}</span>
				{/if}

				{#if profile.admin}
					<Badge color="red" class="mt-2">Admin</Badge>
				{/if}

				<div class="m-4">
					{#if editMode}
						<Button size="xs" outline color="yellow" on:click={editProfile}>Save Changes</Button>
					{:else}
						<Button size="xs" outline color="yellow" on:click={() => (editMode = true)}>Edit</Button
						>
					{/if}
				</div>
			</div>
			<hr class="my-4 border-gray-200 dark:border-gray-700" />
			<div class="space-y-3">
				<div class="flex items-center">
					<Envelope class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
					{#if editMode}
						<input disabled={true} class="ml-2" bind:value={profile.email} placeholder="Email" />
					{:else}
						<span>{profile.email}</span>
					{/if}
				</div>
				{#if profile.phone_number}
					<div class="flex items-center">
						<Phone class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
						{#if editMode}
							<input class="ml-2" bind:value={profile.phone_number} placeholder="Phone Number" />
						{:else}
							<span>{profile.phone_number}</span>
						{/if}
					</div>
				{/if}
				<div class="flex items-center">
					<User class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
					<span>Member since {new Date(profile.created_at).toLocaleDateString()}</span>
				</div>
			</div>
		</Card>
	{/if}
</div>

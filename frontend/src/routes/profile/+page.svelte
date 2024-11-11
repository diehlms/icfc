<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Card, Avatar, Badge, Spinner } from 'flowbite-svelte';
	import { Envelope, Phone, User } from 'svelte-heros-v2';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let loading: boolean = true;
	let profile: any;

	onMount(() => {
		client.restClient?.users
			.getV1Users1(user.id)
			.then((res) => {
				profile = res;
			})
			.catch((err) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: err.message,
					type: ToastTypes.error
				}));
			});
		loading = false;
	});

	const user = get(userStore);
	const client = get(clientStore);

	$: profile;
</script>

<div class="flex items-center justify-center">
	{#if loading}
		<Spinner size="12" />
	{:else if profile}
		<Card class="w-full max-w-md">
			<div class="flex flex-col items-center">
				<Avatar size="xl" class="mb-3" />
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
					{profile.firstname}
					{profile.lastname}
				</h5>
				<span class="text-sm text-gray-500 dark:text-gray-400">@{profile.username}</span>
				{#if profile.admin}
					<Badge color="red" class="mt-2">Admin</Badge>
				{/if}
			</div>
			<hr class="my-4 border-gray-200 dark:border-gray-700" />
			<div class="space-y-3">
				<div class="flex items-center">
					<Envelope class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
					<span>{profile.email}</span>
				</div>
				{#if profile.phone_number}
					<div class="flex items-center">
						<Phone class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
						<span>{profile.phone_number}</span>
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

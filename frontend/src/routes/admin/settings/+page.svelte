<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/display/Loader.svelte';
	import { createEntity, deleteEntity } from '$lib/components/services/crud';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Badge, Button, Hr, Input, Label, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let campMessage: string | undefined = undefined;
	let selectedUserId: number | undefined = undefined;
	let messages: any[] = [];
	let nonAdminUsers: any[] = [];
	let loading: boolean = false;

	let newUser = { firstname: '', lastname: '', email: '', username: '', password: '' };

	onMount(() => {
		if (!user.admin) {
			goto('/');
		}

		client.restClient?.campMessages
			.getV1CampMessages()
			.then((res: any[]) => {
				messages = res;
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body),
					type: ToastTypes.error
				}));
			});

		client.restClient?.users
			.getV1Users()
			.then((res: any[]) => {
				nonAdminUsers = res.filter((u: any) => !u.admin);
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body),
					type: ToastTypes.error
				}));
			});
	});

	const handleCampMessage = (event: Event) => {
		const { target } = event;
		campMessage = (target as HTMLInputElement).value;
	};

	const sendCampMessage = () => {
		loading = true;
		createEntity(
			{ user_id: user.id as number, message: campMessage },
			'Camp Message',
			client.restClient?.campMessages.postV1CampMessages.bind(client.restClient.campMessages) as any
		);
		loading = false;
	};

	const expireCampMessage = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Camp Message',
			client.restClient?.campMessages.deleteV1CampMessages.bind(client.restClient.campMessages) as any
		);
		loading = false;
	};

	const deleteUser = () => {
		if (!selectedUserId) return;
		const selected = nonAdminUsers.find((u: any) => u.id === selectedUserId);
		const label = selected
			? `${selected.firstname} ${selected.lastname} (${selected.email})`
			: `user #${selectedUserId}`;
		if (!confirm(`Are you sure you want to permanently delete ${label}? This cannot be undone.`))
			return;

		loading = true;
		client.restClient?.users
			.deleteV1Users(selectedUserId)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'User deleted!',
					type: ToastTypes.success
				}));
				nonAdminUsers = nonAdminUsers.filter((u: any) => u.id !== selectedUserId);
				selectedUserId = undefined;
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body),
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};

	const createUser = () => {
		loading = true;
		client.restClient?.users
			.postV1Users({ user: newUser })
			.then((data: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'User created!',
					type: ToastTypes.success
				}));
				nonAdminUsers = [...nonAdminUsers, data.user];
				newUser = { firstname: '', lastname: '', email: '', username: '', password: '' };
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: processApiErrorsToString(error.body),
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};

	const user = get(userStore);
	const client = get(clientStore);

	$: messages;
	$: userOptions = nonAdminUsers.map((u: any) => ({
		value: u.id,
		name: `${u.firstname} ${u.lastname} (${u.email})`
	}));
	$: canCreateUser =
		newUser.firstname && newUser.lastname && newUser.email && newUser.username && newUser.password;
</script>

<h1>Settings</h1>

{#if loading}
	<Loader />
{:else}
	<div class="mb-4">
		<h3>Camp Messages:</h3>
		{#if messages.length > 0}
			<ul class="mb-4 divide-y divide-gray-200 rounded border border-gray-200">
				{#each messages as item}
					<li class="flex items-center justify-between px-3 py-2 text-sm">
						<span>{item.message}</span>
						<span class="flex gap-1">
							<Badge color={item.expired ? 'gray' : 'green'} size="xs">
								{item.expired ? 'Expired' : 'Active'}
							</Badge>
							<button
								type="button"
								on:click={() => expireCampMessage(item.id)}
								class="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 hover:bg-red-200"
							>
								Expire
							</button>
						</span>
					</li>
				{/each}
			</ul>
		{/if}
		<Label>Send message to camp?</Label>
		<Input
			size="lg"
			placeholder=""
			style="outlined"
			type="text"
			id="campMessage"
			name="campMessage"
			on:input={handleCampMessage}
			bind:value={campMessage}
		>
			<Button slot="right" size="sm" color="green" outline on:click={sendCampMessage}
				>Send camp message</Button
			>
		</Input>
	</div>
	<Hr />
	<div class="my-4">
		<h3>Create User</h3>
		<p class="mb-3 text-sm text-gray-500">Admin-created users are automatically verified and confirmed.</p>
		<div class="grid grid-cols-2 gap-3 mb-3">
			<div>
				<Label class="mb-1">First name</Label>
				<Input type="text" bind:value={newUser.firstname} />
			</div>
			<div>
				<Label class="mb-1">Last name</Label>
				<Input type="text" bind:value={newUser.lastname} />
			</div>
			<div>
				<Label class="mb-1">Email</Label>
				<Input type="email" bind:value={newUser.email} />
			</div>
			<div>
				<Label class="mb-1">Username</Label>
				<Input type="text" bind:value={newUser.username} />
			</div>
			<div>
				<Label class="mb-1">Password</Label>
				<Input type="password" bind:value={newUser.password} />
			</div>
		</div>
		<Button color="green" outline disabled={!canCreateUser} on:click={createUser}>
			Create User
		</Button>
	</div>
	<Hr />
	<div class="my-4">
		<h3>Delete User</h3>
		<Label class="mb-2">Select a user to delete:</Label>
		<div class="flex gap-2 items-center">
			<Select
				class="flex-1"
				items={userOptions}
				bind:value={selectedUserId}
				placeholder="Select a user..."
			/>
			<Button color="red" outline disabled={!selectedUserId} on:click={deleteUser}>
				Delete User
			</Button>
		</div>
	</div>
{/if}

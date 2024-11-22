<script lang="ts">
	import type { campMessageOut } from '$lib/client';
	import Loader from '$lib/components/display/Loader.svelte';
	import { createEntity, deleteEntity } from '$lib/components/services/crud';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import { Badge, Button, Hr, Input, Label, Listgroup } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let campMessage: string | undefined = undefined;
	let userToDelete: number | undefined = undefined;
	let messages: campMessageOut[] = [];
	let loading: boolean = false;
	let logs: any = undefined;

	onMount(() => {
		client.restClient?.campMessages
			.getV1CampMessages()
			.then((res: campMessageOut[]) => {
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
		
		client.restClient?.logs.getV1Logs({ user_id: user.id}).then((res: any) => {
			logs = res;
			console.log(logs)
		}).catch((error: any) => {
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
		campMessage = target.value;
	};


	const handleUserToDelete = (event: Event) => {
		const { target } = event;
		userToDelete = target.value;
	};


	const sendCampMessage = () => {
		loading = true;
		createEntity(
			{ user_id: user.id as number, message: campMessage },
			'Camp Message',
			client.restClient?.campMessages.postV1CampMessages.bind(client.restClient.campMessages)
		);
		loading = false;
	};

	const expireCampMessage = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Camp Message',
			client.restClient?.campMessages.deleteV1CampMessages.bind(client.restClient.campMessages)
		);
		loading = false;
	};

	const deleteUser = () => {
		loading = true;
		deleteEntity(
			userToDelete,
			{ user_id: user.id as number },
			'User',
			client.restClient?.users.deleteV1Users.bind(client.restClient.users)
		)
	}

	const user = get(userStore);
	const client = get(clientStore);

	$: messages;
	$: logs;
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
					<Badge color={item.expired ? 'gray' : 'green'} size="xs" class="float-right">
						<span>{item.expired ? 'Expired' : 'Active'}</span>
					</Badge>
					<Badge color="red" size="xs" class="float-right">
						<span on:click={() => expireCampMessage(item.id)}>Expire</span>
					</Badge>
				</span>
			</Listgroup>
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
			<Button slot="right" size="sm" color="green" outline on:click={sendCampMessage}>Send camp message</Button
			>
		</Input>
	</div>
	<Hr />
	<div class="my-4">
		<Label>Delete user?</Label>
		<Input
			size="lg"
			style="outlined"
			type="number"
			name="userToDelete"
			id="userToDelete"
			on:input={handleUserToDelete}
			bind:value={userToDelete}
		>
			<Button slot="right" size="sm" color="red" outline on:click={deleteUser}>Delete User</Button
			>
		</Input>
	</div>
	<h1>Logs</h1>
	{#if logs}
	<div class="max-w-1/2">
		<pre>
			<code class="block bg-gray-800 text-green-400 whitespace-pre-wrap p-2">
{#each logs.logs as logLine}
	{logLine}
{/each}
			</code>
		</pre>
	</div>	
	{/if}
{/if}

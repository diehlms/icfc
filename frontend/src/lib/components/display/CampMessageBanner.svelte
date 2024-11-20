<script lang="ts">
	import type { campMessageOut } from '$lib/client/models/campMessageOut';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { Banner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { Megaphone } from 'svelte-heros-v2';
	import { processApiErrorsToString } from '../services/errorHandler';
	import { get } from 'svelte/store';
	import { formatDate } from '../services/textFormatting';

	let messages: campMessageOut[] = [];

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
	});

	const client = get(clientStore);

	$: messages;
</script>

{#if messages.length > 0}
	{#each messages as message}
		{#if !message.expired}
			<div class="mb-4 mt-4 rounded border border-green-500 bg-green-100 px-4 py-3 text-green-700">
				<h4 class="font-semibold">
					<span class="me-3 inline-flex rounded-full bg-green-200 p-1 dark:bg-green-600">
						<Megaphone class="h-3 w-3 text-gray-500 dark:text-green-400" />
					</span>
					{formatDate(message.created_at)}
				</h4>
				{message.message}
			</div>
		{/if}
	{/each}
{/if}

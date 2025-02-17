<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';
	import { toastStore, ToastTypes } from '$lib/stores';
	import { Toast } from 'flowbite-svelte';
	import { get } from 'svelte/store';
	import { CheckCircle, XCircle } from 'svelte-heros-v2';

	export let message: string | null = get(toastStore).toastMessage;
	let isOpen = get(toastStore).isOpen;
	let toastType = get(toastStore).type;

	$: message;
	$: isOpen;
	$: toastType;

	const hide = () => {
		toastStore.set({
			toastMessage: null,
			isOpen: false,
			type: null
		});
	};

	afterUpdate(() => {
		if (isOpen) {
			const timer = setTimeout(hide, 5000);
			return () => clearTimeout(timer);
		}
	});

	onDestroy(() => {
		toastStore.set({
			toastMessage: null,
			isOpen: false,
			type: null
		});
	});
</script>

{#if isOpen}
	<div class="toast">
		<Toast simple contentClass="w-full text-sm font-normal flex items-center justify-between">
			<span class="toast-message {toastType}">
				{#if toastType == ToastTypes.success}
					<CheckCircle class="mr-5 inline" variation="solid" size="24" />
				{:else if toastType == ToastTypes.error}
					<XCircle class="mr-5 inline" variation="solid" size="24" />
				{/if}
				{message}
			</span>
		</Toast>
	</div>
{/if}

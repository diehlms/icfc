<script lang="ts">
	import { Drawer, CloseButton, Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { articleIn, galleryIn, rideshareIn } from '$lib/client';
	import { ArrowRight } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';

	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let _: galleryIn[] = [];
	let loading: boolean = false;

	onMount(() => {
		loading = true;
		client.restClient?.galleries
			.getV1Galleries()
			.then((data) => {
				_ = data;
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
	});

	const client = get(clientStore);

	$: _;
</script>

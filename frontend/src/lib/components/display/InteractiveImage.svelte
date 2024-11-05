<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { ArrowsPointingOut, Trash, XCircle } from 'svelte-heros-v2';

	export let item: any;
	export let columns: number = 3;
	export let isOwner: boolean = false;

	let selectedImage: any;

	const onDeleteDispatch = createEventDispatcher();

	function onDelete() {
		onDeleteDispatch('handleDelete', item);
	}

	const closeFullPageImage = () => {
		selectedImage = null;
	};

	const openFullPageImage = (image: any) => {
		selectedImage = image;
	};
</script>

{#if item}
	<div class="group relative cursor-pointer overflow-hidden rounded-lg">
		<img
			src={item.src}
			alt={''}
			class="h-auto w-full transform object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
		/>
		<div
			class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<Button
				color="dark"
				size="sm"
				class="!flex items-center gap-2 bg-black/70 px-4 py-2 text-white backdrop-blur-sm transition-transform hover:bg-black/80"
				on:click={() => openFullPageImage(item)}
			>
				<ArrowsPointingOut />
				Open
			</Button>

			{#if isOwner}
				<Button
					color="red"
					size="sm"
					class="!flex items-center gap-2 bg-red-500/70 px-4 py-2 text-white backdrop-blur-sm transition-transform hover:bg-red-600/80"
					on:click={() => onDelete(item.id)}
				>
					<Trash />
					Delete
				</Button>
			{/if}
		</div>
		<div
			class="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white backdrop-blur-sm"
		>
			{item.alt}
		</div>
	</div>

	{#if selectedImage}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
			<div class="relative">
				<img src={selectedImage.src} alt={selectedImage.alt} class="max-h-screen max-w-full" />
				<Button outline class="absolute right-4 top-4" on:click={closeFullPageImage}
					><XCircle /></Button
				>
			</div>
		</div>
	{/if}
{/if}

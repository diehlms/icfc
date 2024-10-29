<script lang="ts">
	import { Dropzone, Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	let files = {
		accepted: [] as File[], // Store actual File objects here
		rejected: []
	};
	let value: string[] = []; // File names (for display purposes)

	const dispatch = createEventDispatcher();

	function onSubmit() {
		dispatch('triggerAttachmentUpload', {
			files: files,
			value: value
		});
	}

	// Handle file selection via drop
	const dropHandle = (event: DragEvent) => {
		event.preventDefault();
		files.accepted = [];

		// Use DataTransferItemList interface to access the files
		if (event.dataTransfer && event.dataTransfer.items) {
			for (let i = 0; i < event.dataTransfer.items.length; i++) {
				if (event.dataTransfer.items[i].kind === 'file') {
					const file = event.dataTransfer.items[i].getAsFile();
					if (file) {
						files.accepted.push(file); // Push the actual file objects
						value.push(file.name); // Push file names for display
					}
				}
			}
		}
		files = { ...files };
		value = [...value];
	};

	// Handle file selection via input
	const handleChange = (event: InputEvent) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			files.accepted.push(file); // Add file object to the accepted files array
			value.push(file.name); // Add file name to the display array
		}
		files = { ...files };
		value = [...value];
	};

	// Function to show the selected file names
	const showFiles = (value: any) => {
		if (value.length === 1) return value[0];
		let concat = value.map((value: any) => value).join(', ');
		if (concat.length > 40) concat = concat.slice(0, 40) + '...';
		return concat;
	};

	$: files;
	$: value;
</script>

<div class="my-3">
	Add/Update Image
	<Dropzone
		id="dropzone"
		on:drop={dropHandle}
		on:dragover={(event) => {
			event.preventDefault();
		}}
		on:change={handleChange}
	>
		<svg
			aria-hidden="true"
			class="mb-3 h-10 w-10 text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
			/></svg
		>
		{#if value.length === 0}
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or JPEG</p>
		{:else}
			<p>{showFiles(value)}</p>
		{/if}
	</Dropzone>
</div>
<Button outline color="green" on:click={onSubmit}>Upload</Button>

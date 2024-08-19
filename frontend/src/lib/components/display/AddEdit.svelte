<script lang="ts">
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import { toTitleCase } from '$lib/components/services/textFormatting';
	import { FloatingLabelInput, Checkbox, Button, Select, Label, Drawer } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import Dropzone from "svelte-file-dropzone";
	import Editor from '@tinymce/tinymce-svelte';

	export let form: FormInput[] = new FormBuilder().build();
    export let openDrawerLabel: string = "Add new"

    let hidden1 = true;
    let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let payload: any = {};
	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	const dispatch = createEventDispatcher();

	function onSubmit() {
		dispatch('triggerModalFormSubmit', payload);
	}

	function handleInput(event: any) {
		const { name, value } = event.target;
		payload = { ...payload, [name]: value };
	}
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<form class="flex flex-col space-y-2" on:submit|preventDefault={onSubmit}>
		{#each form as input}
			<div class="w-full">
				{#if input.type == 'text' || input.type == 'password'}
					<div>
						<FloatingLabelInput
							placeholder={input.name}
							label={toTitleCase(input.name)}
							style="outlined"
							type={input.type}
							disabled={input.uneditable}
							id={input.name}
							name={input.name}
							on:input={handleInput}
							bind:value={input.value}
						/>
					</div>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'richText'}
					<Editor
						apiKey='6ilbob7y500eesacvilah194gk2uyx7snt00b5275xeamsat'
					/>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'checkbox'}
					<Checkbox checked={input.value}>{toTitleCase(input.name)}</Checkbox>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'select'}
					<Label for="role" />
					<Select class="mt-2" items={input.selectOptions} bind:value={payload[input.name]} />
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'attachment'}
					<Dropzone on:drop={handleFilesSelect} />
					<ol>
						{#each files.accepted as item}
							<li>{item.name}</li>
						{/each}
					</ol>
				{/if}
			</div>
		{/each}
		<Button outline={true} type="submit" on:click={onSubmit}>Submit</Button>
	</form>
</Drawer>


<div class="text-center">
	<Button on:click={() => (hidden1 = false)}>{openDrawerLabel}</Button>
</div>

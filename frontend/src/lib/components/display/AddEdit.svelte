<script lang="ts">
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import { toTitleCase } from '$lib/components/services/textFormatting';
	import Wysiwyg from './WYSIWYG.svelte';
	import { FloatingLabelInput, Checkbox, Button, Select, Label, Drawer, SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import Dropzone from "svelte-file-dropzone";
	import { Plus } from 'svelte-heros-v2';

	export let form: FormInput[] = new FormBuilder().build();
  export let openDrawerLabel: string = "Add new"
	export let displayAsButton: boolean = false;

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
		payload.files = files;
	}

	const dispatch = createEventDispatcher();

	function onSubmit() {
		dispatch('triggerModalFormSubmit', payload);
	}

	function handleWysiwygInput(content: string, name: string) {
    payload[name] = content;
  }

	function handleInput(event: any) {
		const { name, value } = event.target;
		payload = { ...payload, [name]: value };
	}

	// Populate the payload with initial values (if it's an edit form)
	$: if (form && form.length) {
		form.forEach(input => {
			if (input.value !== undefined) {
				payload[input.name] = input.value;  // Prepopulate the payload with the initial form data
			}
		});
	}

</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<form class="flex flex-col space-y-1" on:submit|preventDefault={onSubmit}>
		{#each form as input}
			<div class="w-full">
				{#if input.type == 'text' || input.type == 'password' || input.type == 'number' || input.type == 'datetime-local' }
					<div>
						<Label for={input.name} class="block">{toTitleCase(input.name)}</Label>
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
			<div>
				{#if input.type == 'richText'}
					<Wysiwyg on:input={(e) => handleWysiwygInput(e.detail, input.name)} bind:content={input.value} />
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
		<Button outline={true} type="submit">Submit</Button>
	</form>
</Drawer>

{#if displayAsButton}
	<Button on:click={() => (hidden1 = false)} outline>
		{openDrawerLabel}
	</Button>
{:else}
	<SpeedDial defaultClass="fixed end-6 bottom-12">
		<SpeedDialButton on:click={() => (hidden1 = false)} name={openDrawerLabel}>
			<Plus class="w-6 h-6" />
		</SpeedDialButton>
	</SpeedDial>
{/if}
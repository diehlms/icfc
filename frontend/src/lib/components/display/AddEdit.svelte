<script lang="ts">
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import { toTitleCase } from '$lib/components/services/textFormatting';
	import Wysiwyg from './WYSIWYG.svelte';
	import {
		FloatingLabelInput,
		Checkbox,
		Button,
		Select,
		Label,
		SpeedDial,
		SpeedDialButton,
		Modal
	} from 'flowbite-svelte';
	import { PencilSquare, RocketLaunch } from 'svelte-heros-v2';
	import { createEventDispatcher } from 'svelte';
	import { Plus } from 'svelte-heros-v2';
	import AttachmentUploader from './AttachmentUploader.svelte';

	export let form: FormInput[] = new FormBuilder().build();
	export let openDrawerLabel: string = 'Add new';
	export let displayAsButton: boolean = false;

	let defaultModal = false;
	let payload: any = {};

	const dispatch = createEventDispatcher();

	function onSubmit(event?: any) {
		if (event?.detail?.files) {
			payload.files = event.detail.files;
		}
		dispatch('triggerModalFormSubmit', payload);
	}

	function addAttachmentToPayload(event?: any) {
		event.preventDefault();
		if (event?.detail?.files) {
			payload.files = event.detail.files;
		}
	}

	function handleWysiwygInput(content: string, name: string) {
		payload[name] = content;
	}

	function handleInput(event: any) {
		const { name, value } = event.target;
		payload = { ...payload, [name]: value };
	}

	function handleCheck(event: any) {
		const { name, checked } = event.target;
		payload = { ...payload, [name]: checked };
	}

	$: if (form && form.length) {
		form.forEach((input) => {
			if (input.value !== undefined) {
				payload[input.name] = input.value;
			}
		});
	}
</script>

<Modal bind:open={defaultModal}>
	<form class="flex flex-col space-y-1" on:submit|preventDefault={onSubmit}>
		{#each form as input}
			<div class="w-full">
				{#if input.type == 'text' || input.type == 'password' || input.type == 'number' || input.type == 'datetime-local'}
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
					<Label for={input.name} class="block">{toTitleCase(input.name)}</Label>
					<Wysiwyg
						on:input={(e) => handleWysiwygInput(e.detail, input.name)}
						bind:content={input.value}
					/>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'checkbox'}
					<Checkbox
						bind:value={input.value}
						name={input.name}
						on:change={handleCheck}
						bind:checked={input.value}>{toTitleCase(input.name)}</Checkbox
					>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'select'}
					<Label for={input.name} class="block">{toTitleCase(input.name)}</Label>
					<Select
						class="mt-2"
						items={input.selectOptions}
						name={input.name}
						on:change={handleInput}
						bind:value={input.value}
					/>
				{/if}
			</div>
			{#if input.type == 'attachment'}
				<AttachmentUploader
					on:triggerAttachmentUpload={addAttachmentToPayload}
					showUploadButton={false}
				/>
			{/if}
		{/each}
		<Button color="green" type="submit"><RocketLaunch /> Submit</Button>
	</form>
</Modal>

{#if displayAsButton}
	<Button color="yellow" size="xs" on:click={() => (defaultModal = true)} outline>
		<PencilSquare />
		{openDrawerLabel}
	</Button>
{:else}
	<SpeedDial defaultClass="fixed end-6 bottom-12">
		<SpeedDialButton on:click={() => (defaultModal = true)} name={openDrawerLabel}>
			<Plus class="h-6 w-6" />
		</SpeedDialButton>
	</SpeedDial>
{/if}

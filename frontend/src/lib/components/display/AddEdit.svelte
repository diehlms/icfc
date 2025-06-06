<script lang="ts">
	import FormBuilder, { FormInput } from '$lib/components/services/formBuilder';
	import { toTitleCase } from '$lib/components/services/textFormatting';
	import Wysiwyg from './WYSIWYG.svelte';
	import { FloatingLabelInput, Checkbox, Button, Select, Label, Modal } from 'flowbite-svelte';
	import { PencilSquare, RocketLaunch } from 'svelte-heros-v2';
	import { createEventDispatcher } from 'svelte';
	import AttachmentUploader from './AttachmentUploader.svelte';

	export let form: FormInput[] = new FormBuilder().build();
	export let openDrawerLabel: string = 'Add new';
	export let errors: any = undefined;

	let defaultModal = false;
	let payload: Record<string, any> = {};

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
		payload = { ...payload, [name]: content };
	}

	function handleInput(event: any) {
		const { name, value } = event.target;
		payload = { ...payload, [name]: value };
	}

	function handleCheck(event: any) {
		const { name, checked } = event.target;
		payload = { ...payload, [name]: checked };
	}

	function resetForm() {
		payload = {};
	}

	$: {
		if (!Object.keys(payload).length && form?.length) {
			form.forEach((input) => {
				if (input.value !== undefined) {
					payload[input.name] = input.value;
				}
			});
		}
	}
	$: errors;
</script>

<Modal bind:open={defaultModal} on:close={resetForm}>
	<form
		class="bg-grey-500/[.06] flex flex-col space-y-1 rounded-sm p-5"
		on:submit|preventDefault={onSubmit}
	>
		{#if errors}
			<span>{errors}</span>
		{/if}
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
							value={input.value}
						/>
					</div>
				{/if}
			</div>
			<div>
				{#if input.type == 'richText'}
					<Label for={input.name} class="block">{toTitleCase(input.name)}</Label>
					<Wysiwyg
						on:wysiwygContentUpdate={(e) => handleWysiwygInput(e.detail, input.name)}
						bind:content={input.value}
					/>
				{/if}
			</div>
			<div class="flex">
				{#if input.type == 'checkbox'}
					<Checkbox
						value={input.value}
						name={input.name}
						on:change={handleCheck}
						checked={input.value}>{toTitleCase(input.name)}</Checkbox
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
						value={input.value}
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

<div class="not-printable mb-4">
	<Button size="xs" on:click={() => (defaultModal = true)} outline>
		<PencilSquare />
		{openDrawerLabel}
	</Button>
</div>

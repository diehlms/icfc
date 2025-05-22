<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';
	import { createEventDispatcher } from 'svelte';

	export let content: string | null = null;
	let editor: any;
	let element: any;
	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				TextAlign.configure({ types: ['heading', 'paragraph'] })
			],
			content: content || ``,
			onUpdate: ({ editor }) => {
				dispatch('wysiwygContentUpdate', editor.getHTML());
			}
		});
	});

	$: if (editor && content !== null) {
		editor.commands.setContent(content);
	}

	onDestroy(() => {
		editor.destroy();
	});
</script>

<div class="wysiwyg-editor">
	<div class="toolbar">
		{#if editor}
			<button on:click|preventDefault={() => editor.chain().focus().undo().run()}>Undo</button>
			<button on:click|preventDefault={() => editor.chain().focus().redo().run()}>Redo</button>
			<button
				on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
				class={editor.isActive('paragraph') ? 'active' : ''}>P</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'active' : ''}>Bold</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'active' : ''}>Italic</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleStrike().run()}
				class={editor.isActive('strike') ? 'active' : ''}>Strike</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().setTextAlign('left').run()}
				class={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}>Left</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().setTextAlign('center').run()}
				class={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}>Center</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().setTextAlign('right').run()}
				class={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}>Right</button
			>
			<button
				on:click|preventDefault={() => editor.chain().focus().setTextAlign('justify').run()}
				class={editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}>Justify</button
			>
		{/if}
	</div>
	<div bind:this={element} />
</div>

<style lang="scss">
	.wysiwyg-editor {
		border: 1px solid #eeeeee;
		max-height: 45vh;
		overflow-y: scroll;
		border-radius: 3px;
		padding: 5px;
	}
	.toolbar {
		background-color: #0d0d0d;
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.toolbar button {
		border: none;
		background: none;
		color: #fff;
		font-weight: 500;
		padding: 0 0.5rem;
		opacity: 0.6;
		margin: 0;
	}
	.toolbar button:hover,
	.toolbar button.is-active {
		opacity: 1;
	}
</style>

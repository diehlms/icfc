<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import { createEventDispatcher } from 'svelte';

	export let content: string | null = null;

	let bubbleMenu: any;
	let element: any;
	let editor: any;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: bubbleMenu
				})
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
	<div class="bubble-menu" bind:this={bubbleMenu}>
		{#if editor}
			<button
				on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
				class:active={editor.isActive('paragraph')}
			>
				P
			</button>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
			>
				Bold
			</button>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
				class:active={editor.isActive('italic')}
			>
				Italic
			</button>
			<button
				on:click|preventDefault={() => editor.chain().focus().toggleStrike().run()}
				class:active={editor.isActive('strike')}
			>
				Strike
			</button>
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

	.bubble-menu {
		display: flex;
		background-color: #0d0d0d;
		padding: 0.2rem;
		border-radius: 0.5rem;
		transition:
			visibility 0.1s ease,
			opacity 0.1s ease;
	}

	.bubble-menu button {
		border: none;
		background: none;
		color: #fff;
		font-weight: 500;
		padding: 0 0.2rem;
		opacity: 0.6;
		margin: 0;
	}

	.bubble-menu button:hover,
	.bubble-menu button.is-active {
		opacity: 1;
	}
</style>

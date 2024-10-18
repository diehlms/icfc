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
  let initialized = false; // Track if the editor has been initialized with content

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        BubbleMenu.configure({
          element: bubbleMenu,
        }),
      ],
      content: content || `
        <h1>Hello Svelte! 🌍️ </h1>
        <p>This editor is running in Svelte.</p>
        <p>Select some text to see the bubble menu popping up.</p>
      `,
      onUpdate: ({ editor }) => {
        // Dispatch an 'input' event with the updated content
        dispatch('input', editor.getHTML());
      },
    });

    initialized = true;
  });

  // Only update the editor's content when it's first initialized or when content changes externally
  $: if (editor && content && !initialized) {
    editor.commands.setContent(content);
    initialized = true; // Ensure this only runs once after initialization
  }

  onDestroy(() => {
    editor.destroy();
  });
</script>

<div class="wysiwyg-editor">
  <div class="bubble-menu" bind:this="{bubbleMenu}">
    {#if editor}
      <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
        P
      </button>    
      <button on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}>
        Bold
      </button>
      <button on:click={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive('italic')}>
        Italic
      </button>
      <button on:click={() => editor.chain().focus().toggleStrike().run()} class:active={editor.isActive('strike')}>
        Strike
      </button>
    {/if}
  </div>

  <div bind:this={element} />
</div>

<style>
  .wysiwyg-editor {
    border: 1px solid red;
    border-radius: 3px;
    padding: 5px;
  }
  
  .bubble-menu {
    display: flex;
    background-color: #0D0D0D;
    padding: 0.2rem;
    border-radius: 0.5rem;
    transition: visibility 0.1s ease, opacity 0.1s ease;
  }
  
  .bubble-menu button {
    border: none;
    background: none;
    color: #FFF;
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

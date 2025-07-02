<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import { Eye, EyeSlash } from 'svelte-heros-v2';

	export let value: string = '';
	export let placeholder: string = 'Password';
	export let id: string = 'password';
	export let required: boolean = false;

	let showPassword = false;

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="relative">
	<Input
		{id}
		{required}
		{placeholder}
		{value}
		type={showPassword ? 'text' : 'password'}
		class="m-2"
		on:input={(e) => (value = e.target.value)}
	/>
	<button
		type="button"
		class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
		on:click={togglePasswordVisibility}
		aria-label={showPassword ? 'Hide password' : 'Show password'}
	>
		{#if showPassword}
			<EyeSlash class="w-5 h-5" />
		{:else}
			<Eye class="w-5 h-5" />
		{/if}
	</button>
</div> 
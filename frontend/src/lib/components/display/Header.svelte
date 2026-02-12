<script>
	export let size = 'h1';
	export let text = 'Page Title';
</script>

{#if size === 'h1'}
	<h1 class="my-4 text-3xl font-bold">{text}</h1>
{:else if size === 'h2'}
	<h2 class="my-3 text-2xl font-semibold">{text}</h2>
{:else if size === 'h3'}
	<h3 class="my-2 text-xl font-semibold">{text}</h3>
{:else}
	<h4 class="my-2 text-lg font-medium">{text}</h4>
{/if}

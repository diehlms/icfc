<script>
  export let size = "h1";
  export let text = "Page Title";
</script>

{#if size === "h1"}
  <h1 class="text-3xl font-bold my-4">{text}</h1>
{:else if size === "h2"}
  <h2 class="text-2xl font-semibold my-3">{text}</h2>
{:else if size === "h3"}
  <h3 class="text-xl font-semibold my-2">{text}</h3>
{:else}
  <h4 class="text-lg font-medium my-2">{text}</h4>
{/if}

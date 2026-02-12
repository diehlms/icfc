<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let pathSegments: string[] = [];
	let origin: string | null = null;

	page.subscribe((val) => {
		if (!origin) {
			origin = val.url.origin;
		}
		pathSegments = val.url.pathname.split('/').filter((pathSegment) => pathSegment !== '');
	});

	$: pathSegments;
</script>

<div class="not-printable">
	<Breadcrumb aria-label="Dynamic breadcrumb">
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		{#each pathSegments as segment, index (index)}
			{#if index === pathSegments.length - 1}
				<BreadcrumbItem aria-current="page" disabled>{segment}</BreadcrumbItem>
			{:else}
				<BreadcrumbItem href={origin + '/' + pathSegments.slice(0, index + 1).join('/')}>
					{segment}
				</BreadcrumbItem>
			{/if}
		{/each}
	</Breadcrumb>
</div>

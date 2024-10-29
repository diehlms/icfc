<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { page } from '$app/stores';

	// Subscribe to the pathStore to get dynamic path segments
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

<Breadcrumb aria-label="Dynamic breadcrumb">
	<!-- Always render the 'Home' breadcrumb -->
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>

	<!-- Dynamically generate breadcrumb items for each segment -->
	{#each pathSegments as segment, index (index)}
		{#if index === pathSegments.length - 1}
			<!-- Last segment is disabled and non-clickable -->
			<BreadcrumbItem aria-current="page" disabled>{segment}</BreadcrumbItem>
		{:else}
			<!-- Generate the breadcrumb for intermediate segments -->
			<BreadcrumbItem href={origin + pathSegments.slice(0, index + 1).join('/')}>
				{segment}
			</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>

<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  export let localPathName: string = ""
</script>

<Breadcrumb aria-label="Default breadcrumb example">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href="/{localPathName}">{localPathName}</BreadcrumbItem>
</Breadcrumb>
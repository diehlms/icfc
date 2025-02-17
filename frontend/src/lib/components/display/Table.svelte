<script lang="ts">
	import type { TableRow } from '$lib/interfaces/TableRow';
	import {
		toCamelCase,
		toTitleCase,
		type ITableAction
	} from '$lib/components/services/textFormatting';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Indicator
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let searchTerm = '';
	export let tableData: TableRow[];
	export let tableName: string;
	export let selectable: boolean;
	export let columnNames: string[];
	export let searchableAttribute: string;
	export let tableActions: ITableAction[];
	export let followable: boolean = false;
	export let showSearch: boolean = true;

	let filteredTableItems: TableRow[];
	let allRowsSelected: boolean = false;
	let paginatedItems: TableRow[] = tableData;

	$: tableData;
	$: {
		filteredTableItems = tableData.filter(
			(item: any) =>
				item[searchableAttribute]?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		);
		allRowsSelected;
	}

	function selectAll() {
		allRowsSelected = !allRowsSelected;
		tableData.forEach((item) => {
			item.checked = !item.checked;
		});
	}

	function checkItem(opt: any) {
		opt.checked = !opt.checked;
	}

	function follow(row: any) {
		if (followable) {
			let unsubscribe = page.subscribe(($page) => {
				goto(`${$page.url.pathname}/${row.id}`);
			});
			unsubscribe();
		}
	}
</script>

<p class="sticky text-5xl dark:text-white">
	{tableName}
</p>
<div class="table-slim">
	<Table hoverable={true} striped={true}>
		<TableHead>
			{#if selectable}
				<TableHeadCell class="!p-4">
					<Checkbox on:click={selectAll} />
				</TableHeadCell>
			{/if}
			{#each columnNames as column}
				<TableHeadCell>{column === 'rawhtml' ? '' : toTitleCase(column)}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each paginatedItems as data}
				<TableBodyRow on:click={() => follow(data)}>
					{#if selectable}
						<TableBodyCell class="!p-4">
							<Checkbox on:click={() => checkItem(data)} checked={data.checked} />
						</TableBodyCell>
					{/if}
					{#each columnNames as column}
						{#if data[toCamelCase(column)]?.toString() === 'true' || data[toCamelCase(column)]?.toString() === 'false'}
							<TableBodyCell
								><Indicator
									color={data[toCamelCase(column)].toString() === 'true' ? 'green' : 'red'}
								/></TableBodyCell
							>
						{:else if column === 'rawhtml'}
							<TableBodyCell>{@html data[toCamelCase(column)]}</TableBodyCell>
						{:else}
							<TableBodyCell>{data[toCamelCase(column)]}</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
	.table-cell-hover:hover {
		cursor: pointer;
	}
</style>

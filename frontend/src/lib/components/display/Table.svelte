<script lang="ts">
	import type { TableRow } from '$lib/interfaces/TableRow';
	import { toCamelCase, toTitleCase } from '$lib/components/services/textFormatting';
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
	export let tableData: TableRow[] = [];
	export let tableName: string;
	export let selectable: boolean;
	export let columnNames: string[];
	export let searchableAttribute: string;
	export let followable: boolean = false;

	let filteredTableItems: TableRow[] = tableData;
	let paginatedItems: TableRow[] = tableData;
	let allRowsSelected: boolean = false;

	let sortColumn: string = '';
	let sortDescending: boolean = false;

	function selectAll() {
		allRowsSelected = !allRowsSelected;
		tableData.forEach((item) => {
			item.checked = allRowsSelected;
		});
	}

	function checkItem(opt: TableRow) {
		opt.checked = !opt.checked;
	}

	function follow(row: TableRow) {
		if (followable) {
			let unsubscribe = page.subscribe(($page) => {
				goto(`${$page.url.pathname}/${row.id}`);
			});
			unsubscribe();
		}
	}

	function sortTable() {
		if (sortColumn) {
			filteredTableItems.sort((a, b) => {
				const aValue = (a[toCamelCase(sortColumn)] || '').toString();
				const bValue = (b[toCamelCase(sortColumn)] || '').toString();
				return sortDescending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
			});
		}
		paginatedItems = [...filteredTableItems];
	}

	function toggleSort(column: string) {
		if (sortColumn === column) {
			sortDescending = !sortDescending;
		} else {
			sortColumn = column;
			sortDescending = false;
		}
		sortTable();
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
				<TableHeadCell on:click={() => toggleSort(column)} style="cursor: pointer;">
					{column === 'rawhtml' ? '' : toTitleCase(column)}
					{sortColumn === column ? (sortDescending ? '↓' : '↑') : ''}
				</TableHeadCell>
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
							<TableBodyCell>
								<Indicator
									color={data[toCamelCase(column)].toString() === 'true' ? 'green' : 'red'}
								/>
							</TableBodyCell>
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

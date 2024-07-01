<script lang="ts">
	import type { TableRow } from '$lib/interfaces/TableRow';
	import { toCamelCase, type ITableAction } from '$lib/components/services/textFormatting';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch,
		ButtonGroup,
		Button,
		Indicator
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { afterUpdate, onMount } from 'svelte';

	export let searchTerm = '';
	export let tableData: TableRow[];
	export let tableName: string;
	export let selectable: boolean;
	export let columnNames: string[];
	export let searchableAttribute: string;
	export let tableActions: ITableAction[];
	export let followable: boolean = false;
	export let showSearch: boolean = true;

	let pageSize: number = 10;
	let currentPageIndex: number = 0;

	let filteredTableItems: TableRow[];
	let allRowsSelected: boolean = false;
	let paginatedItems: TableRow[] = [];

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

	function follow(row) {
		if (followable) {
			let unsubscribe = page.subscribe(($page) => {
				goto(`${$page.url.pathname}/${row.id}`);
			});
			unsubscribe();
		}
	}

	onMount(() => {
		updatePagination();
	});

	afterUpdate(() => {
		updatePagination();
	});

	const updatePagination = () => {
		const startIndex = currentPageIndex * pageSize;
		const endIndex = startIndex + pageSize;
		paginatedItems = filteredTableItems.slice(startIndex, endIndex);
	};
</script>

<div class="container">
	<p class="text-5xl dark:text-white">
		{tableName}
	</p>
	<div class="table-slim">
		{#if showSearch}
			<TableSearch
				placeholder="Search by {searchableAttribute}"
				hoverable={true}
				bind:inputValue={searchTerm}
			>
				<Table hoverable={true} striped={true}>
					<TableHead>
						{#if selectable}
							<TableHeadCell class="!p-4">
								<Checkbox on:click={selectAll} />
							</TableHeadCell>
						{/if}
						{#each columnNames as column}
							<TableHeadCell>{column === 'rawhtml' ? '' : column.toUpperCase()}</TableHeadCell>
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
			</TableSearch>
		{:else}
			<Table hoverable={true} striped={true}>
				<TableHead>
					{#if selectable}
						<TableHeadCell class="!p-4">
							<Checkbox on:click={selectAll} />
						</TableHeadCell>
					{/if}
					{#each columnNames as column}
						<TableHeadCell>{column === 'rawhtml' ? '' : column.toUpperCase()}</TableHeadCell>
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
		{/if}
		<div class="paginator">
			<div>
				<ButtonGroup>
					<Button
						class="btn-override"
						size="sm"
						outline
						on:click={() => currentPageIndex--}
						disabled={currentPageIndex === 0}>Previous</Button
					>
					<Button
						class="btn-override"
						size="sm"
						outline
						on:click={() => currentPageIndex++}
						disabled={currentPageIndex === Math.floor(filteredTableItems.length / pageSize)}
						>Next</Button
					>
				</ButtonGroup>
			</div>
		</div>
	</div>
</div>

<style>
	.table-slim {
		padding-bottom: 100px;
	}

	.paginator {
		display: flex;
		justify-content: center;
		padding-top: 20px;
		margin-top: 20px;
	}
</style>

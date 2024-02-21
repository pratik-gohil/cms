<script lang="ts">
	import { goto } from '$app/navigation';
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils/common.js';
	import { Grid, Table as TableIcon, Plus } from 'radix-icons-svelte';
	export let data;
	let search = '';

	
</script>

<div class="mb-4 flex justify-between">
	<span class="text-xl font-semibold">Categories :</span>

	<a href="/category/new">
		<Button class="text-sm">
			<span class="mr-2">New category </span>
			<Plus />
		</Button>
	</a>
</div>

<div class="mb-8 flex justify-between">
	<Input
		class="w-[300px]"
		type="text"
		placeholder="Search..."
		on:input={function (event) {
			// @ts-ignore
			search = event.target.value;
		}}
	/>

</div>

	<div class="overflow-hidden">
		<Table.Root class="whitespace-nowrap">
			<Table.Caption>End of Table</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Name</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.categories
					.filter((category) => category.name
							.toLowerCase()
							.includes(search.toLowerCase()))
					.slice(0, 15) as category}
					<Table.Row class="cursor-pointer" on:click={() => goto('/category/' + category.id)}>
						<Table.Cell>{category.id}</Table.Cell>
						<Table.Cell>{category.name}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

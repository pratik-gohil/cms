<script lang="ts">
	import { goto } from '$app/navigation';
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils/common.js';
	// import { cn } from '$lib/utils.js';
	import { Plus, Grid, Table as TableIcon } from 'radix-icons-svelte';

	export let data;
    console.log(data)
	let active = 'Table';
	let search = '';
</script>

<div class="mb-4 flex justify-between">
	<span class="text-xl font-semibold">Categories :</span>

	<a href="/categories/add/new">
		<Button class="text-sm">
			<span class="mr-2">Add Category </span>
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

	<!-- <div class="flex gap-3">
		<button
			type="button"
			class="flex items-center justify-center"
			on:click={() => (active = 'Grid')}
		>
			<Grid size={20} class="text-secondary-foreground" />
		</button>
		<button
			type="button"
			class="flex items-center justify-center"
			on:click={() => (active = 'Table')}
		>
			<TableIcon size={20} class="text-secondary-foreground" />
		</button>
	</div> -->
</div>

<!-- {#if active === 'Grid'}
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each data.articles.filter((article) => article.articleTitle
				.toLowerCase()
				.includes(search.toLowerCase())) as article}
			<a href={'/article/' + article.id}>
				<ArticleCard {article} />
			</a>
		{/each}
	</div>
{:else} -->
	<div class="overflow-hidden">
		<Table.Root class="whitespace-nowrap">
			<Table.Caption>End of Table</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Slug</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Action</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.categories
					.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
					.slice(0, 15) as cat}
					<Table.Row class="cursor-pointer" 
                    >
						<Table.Cell>{cat.id}</Table.Cell>
						<Table.Cell>{cat.name}</Table.Cell>
						<Table.Cell>{cat.slug}</Table.Cell>
						<!-- <Table.Cell>{new Date(cat.createdAt).toDateString()}</Table.Cell> -->
						<Table.Cell>
							<span
								class={cn('rounded-md px-4 py-0.5 text-xs font-medium', {
									'bg-blue-200': !cat.status,
									'bg-green-200': cat.status,
									'text-blue-800': !cat.status,
									'text-green-800': cat.status
								})}
							>
								{cat.status ? 'active' : 'in-active'}
							</span>
						</Table.Cell>
						<Table.Cell class='flex'>
                            <a href={`/categories/edit/${cat.id}`}>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"/>
                                  </svg>
                            </a>
                            <a href={`/categories/delete/${cat.id}`} ><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd"/>
                              </svg>
                              </a>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
<!-- {/if} -->

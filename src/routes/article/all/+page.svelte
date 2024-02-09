<script lang="ts">
	import { goto } from '$app/navigation';
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils.js';
	import { Plus, Grid, Table as TableIcon } from 'radix-icons-svelte';

	export let data;

	let active = 'Table';
	let search = '';
</script>

<div class="mb-4 flex justify-between">
	<span class="text-xl font-semibold">Articles :</span>

	<a href="/article/new">
		<Button class="text-sm">
			<span class="mr-2">New Article </span>
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

	<div class="flex gap-3">
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
	</div>
</div>

{#if active === 'Grid'}
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each data.articles.filter((article) => article.articleTitle
				.toLowerCase()
				.includes(search.toLowerCase())) as article}
			<a href={'/article/' + article.id}>
				<ArticleCard {article} />
			</a>
		{/each}
	</div>
{:else}
	<div class="overflow-hidden">
		<Table.Root class="whitespace-nowrap">
			<Table.Caption>End of Table</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Title</Table.Head>
					<Table.Head>Description</Table.Head>
					<Table.Head>Slug</Table.Head>
					<Table.Head>Created At</Table.Head>
					<Table.Head>Published At</Table.Head>
					<Table.Head>Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.articles
					.filter((article) => article.articleTitle.toLowerCase().includes(search.toLowerCase()))
					.slice(0, 15) as article}
					<Table.Row class="cursor-pointer" on:click={() => goto('/article/' + article.id)}>
						<Table.Cell>{article.id}</Table.Cell>
						<Table.Cell>{article.articleTitle}</Table.Cell>
						<Table.Cell>
							<span
								class="whitespace-no-wrap inline-block max-w-[300px] overflow-hidden text-ellipsis text-nowrap"
							>
								{article.articleShortDescription}
							</span>
						</Table.Cell>
						<Table.Cell>
							{'Difference-between-Dematerialisation-and-Rematerialisation' ||
								article.articleHrefURL}</Table.Cell
						>
						<Table.Cell>{new Date(article.createdAt).toDateString()}</Table.Cell>
						<Table.Cell>{new Date(article.articlePublishDate).toDateString()}</Table.Cell>
						<Table.Cell>
							<span
								class={cn('rounded-md px-4 py-0.5 text-xs font-medium', {
									'bg-blue-200': !article.articleIsActive,
									'bg-green-200': article.articleIsActive,
									'text-blue-800': !article.articleIsActive,
									'text-green-800': article.articleIsActive
								})}
							>
								{article.articleIsActive ? 'Published' : 'Draft'}
							</span>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}

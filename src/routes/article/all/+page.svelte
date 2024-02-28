<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils/common.js';
	import { Grid, Table as TableIcon, Plus, ChevronLeft, ChevronRight } from 'radix-icons-svelte';
	import { onMount } from 'svelte';

	export let data;

	$: count = data.count;
	$: articles = data.articles;

	let active = 'Table';
	let search = '';

	let index = 1;
	$: perPage = 15;
	$: siblingCount = 2;

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const url = new URL($page.url);

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	$: {
		search = url.searchParams.get('search') || '';
		index = Number(url.searchParams.get('page')) || 1;
	}

	let delay: ReturnType<typeof setTimeout>;
	$: {
		clearTimeout(delay);
		delay = setTimeout(() => {
			if (mounted) {
				url.searchParams.set('search', search);
				goto(url.search);
			}
		}, 750);
	}

	$: {
		url.searchParams.set('page', index.toString());

		if (mounted) {
			goto(url.search);
		}
	}
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
	<Input class="w-[300px]" type="text" placeholder="Search..." bind:value={search} autofocus />

	<div class="flex gap-3">
		<button
			type="button"
			class="flex items-center justify-center"
			on:click={() => (active = 'Grid')}
		>
			<Grid
				size={20}
				class={cn('text-secondary-foreground', {
					'text-primary': active === 'Grid'
				})}
			/>
		</button>
		<button
			type="button"
			class="flex items-center justify-center"
			on:click={() => (active = 'Table')}
		>
			<TableIcon
				size={20}
				class={cn('text-secondary-foreground', {
					'text-primary': active === 'Table'
				})}
			/>
		</button>
	</div>
</div>

{#if active === 'Grid'}
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each articles as article}
			<a href={'/article/' + article.article_identifier}>
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
					<Table.Head>Identifier</Table.Head>
					<Table.Head>Title</Table.Head>
					<Table.Head>Catrgory</Table.Head>
					<Table.Head>Description</Table.Head>
					<Table.Head>Slug</Table.Head>
					<Table.Head>Created At</Table.Head>
					<Table.Head>Published At</Table.Head>
					<Table.Head>Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each articles as article}
					<Table.Row
						class="cursor-pointer"
						on:click={() => goto('/article/' + article.article_identifier)}
					>
						<Table.Cell>{article.article_identifier}</Table.Cell>
						<Table.Cell>{article.articleTitle}</Table.Cell>
						<Table.Cell>
							<Badge>{article.articleCategory}</Badge>
						</Table.Cell>
						<Table.Cell>
							<span
								class="whitespace-no-wrap inline-block max-w-[300px] overflow-hidden text-ellipsis text-nowrap"
							>
								{article.articleShortDescription}
							</span>
						</Table.Cell>
						<Table.Cell>
							{article.articleHrefURL}</Table.Cell
						>
						<Table.Cell>{new Date(article.createdAt).toDateString()}</Table.Cell>
						<Table.Cell>{new Date(article.articlePublishDate).toDateString()}</Table.Cell>
						<Table.Cell>
							<span
								class={cn('rounded-md px-4 py-0.5 text-xs font-medium', {
									'bg-blue-200': !article.isPublished,
									'bg-green-200': article.isPublished,
									'text-blue-800': !article.isPublished,
									'text-green-800': article.isPublished
								})}
							>
								{article.isPublished ? 'Published' : 'Draft'}
							</span>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}

<Pagination.Root
	{count}
	{perPage}
	{siblingCount}
	let:pages
	let:currentPage
	class="mt-4 flex-row justify-between"
>
	<div>Showing {perPage * (index - 1) + 1} to {perPage * index} of {count}</div>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton disabled={index === 1} on:click={() => index--}>
				<ChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">Previous</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link
						on:click={() => (index = page.value)}
						{page}
						isActive={((index > 0 && index) || currentPage) == page.value}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton
				disabled={index === pages[pages.length - 1].value}
				on:click={() => index++}
			>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>

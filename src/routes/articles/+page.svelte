<script>
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus } from 'radix-icons-svelte';

	export let data;
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
<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
	{#each data.articles as article}
		<ArticleCard {article} />
	{/each}
</div>

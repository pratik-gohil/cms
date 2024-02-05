<script lang="ts">
	import type { ArticleWithCategory } from '$lib/types/Article';

	export let article: ArticleWithCategory;

	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="relative h-full rounded border p-4">
	<h1 class="mb-4 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
		{article.articleTitle}
		<Badge class="ml-2">
			{article.articleCategory.name}
		</Badge>
	</h1>
	<p class="mb-6 text-sm">
		{article.articleShortDescription}
	</p>

	<span class="absolute bottom-4 right-4 text-xs text-gray-500"
		>{new Date(article.articlePublishDate).toDateString()}</span
	>
</div>

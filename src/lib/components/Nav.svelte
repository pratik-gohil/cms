<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

<nav
	class="fixed hidden h-screen w-[var(--sidebar-width)] flex-[0.5] bg-secondary p-5 md:block"
	style="font-family: Roboto"
>
	<h1 class="text-2xl">Collections</h1>

	<Separator class="my-5" />

	<ul>
		<li>
			<a href="/articles">Article</a>
		</li>
		<li>
			<a href="/article-categories">Article Category</a>
		</li>
	</ul>

	<Separator class="my-5" />

	<ul>
		<li>
			<a href="/video">Video</a>
		</li>
	</ul>
</nav>

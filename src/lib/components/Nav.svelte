<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

<nav class="sticky top-0 hidden h-screen min-w-[var(--sidebar-width)] bg-secondary p-5 xl:block">
	<h1 class="text-2xl">Collections</h1>

	<Separator class="my-5" />

	<ul>
		<li>
			<a href="/article/all">Article</a>
		</li>
		<li>
			<a href="/categories">Categories</a>
		</li>
	</ul>

	<Separator class="my-5" />

	<ul>
		<li>
			<a href="#">FAQ</a>
		</li>
	</ul>

	<Separator class="my-5" />

	<ul>
		<li>
			<a href="/video">Video</a>
		</li>
	</ul>
</nav>
 
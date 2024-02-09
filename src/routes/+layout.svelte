<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.pcss';
</script>

<svelte:head>
	<title>MStock CMS</title>
</svelte:head>

<div class="flex">
	<Nav />
	<main class="w-full bg-background p-5">
		<slot />
	</main>
</div>

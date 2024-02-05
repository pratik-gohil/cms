<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	export let data;

	let selected = {
		value: data.article.articleCategory.id,
		label: data.article.articleCategory.name
	};
</script>

<form
	method="post"
	action={data.id === 'new' ? '?/create' : '?/update'}
	class="grid max-w-[460px] gap-4"
>
	<div class="mb-4 flex justify-between">
		<span class="text-xl font-semibold">Articles :</span>
		<div>
			<Button disabled={true} type="submit" value="publish" class="text-sm">Publish</Button>
			<Button type="submit" value="save" class="text-sm">Save</Button>
		</div>
	</div>
	<Input type="text" placeholder="Title" name="articleTitle" value={data.article.articleTitle} />
	<Select.Root bind:selected>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Select a Category" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Categories</Select.Label>
				{#each data.categories as category}
					<Select.Item value={category.id}>{category.name}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="articleCategoryId" />
	</Select.Root>
	<Input
		type="text"
		placeholder="Image Path"
		name="articleImageSrc"
		value={data.article.articleImageSrc}
	/>
	<Input
		type="text"
		placeholder="Image Alt"
		name="articleImageAlt"
		value={data.article.articleImageAlt}
	/>
	<Input
		type="text"
		placeholder="Image Title"
		name="articleImageTitle"
		value={data.article.articleImageTitle}
	/>
	<Textarea
		placeholder="Short Description"
		name="articleShortDescription"
		value={data.article.articleShortDescription}
	/>
</form>

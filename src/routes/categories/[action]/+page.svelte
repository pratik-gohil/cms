<!-- <script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import type { FormOptions } from 'formsnap';
	import { Check, Reload, Trash } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { categoryFormSchema } from '$lib/validations/validationSchema.js';
	import { Root } from 'postcss';
	
	export let data;
	// $: ({ form } = data);

    console.log(data)

	let loading = false;

	let editor: HTMLDivElement;
	let articleContents: HTMLTextAreaElement;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	// onMount(async () => {
	// 	const { default: Quill } = await import('quill');
	// 	const quill = new Quill(editor, {
	// 		modules: {
	// 			toolbar: toolbarOptions
	// 		},
	// 		theme: 'snow',
	// 		placeholder: 'Write your story...'
	// 	});

	// 	quill.root.innerHTML = data.article?.articleContents || '';

	// 	quill.on('text-change', function () {
	// 		articleContents.value = quill.root.innerHTML;
	// 	});
	// });

	// let articleImage: ArrayBuffer | string | null;
	// const onFileSelected = (event: Event) => {
	// 	let image = (event.target as HTMLInputElement)?.files?.[0];
	// 	let reader = new FileReader();
	// 	if (image) {
	// 		reader.readAsDataURL(image);
	// 		reader.onload = (e) => {
	// 			if (e.target) {
	// 				articleImage = e.target.result;
	// 			}
	// 		};
	// 	}
	// };
</script>
<!-- 
<Form.Root
	method="POST"
	action={data.id === 'new' ? '?/create' : '?/update'}
	class="grid gap-4"
	let:config
	enctype="multipart/form-data"
>
	<div class="mb-4 flex justify-between">
		<span class="text-xl font-semibold">category :</span>
		<div>
			<Form.Button
				disabled={data.id === 'new' || loading}
				type="submit"
				name="publish"
				value={(!data.article?.articleIsActive).toString()}
				class="text-sm"
			>
				<Check class="mr-2 h-3 w-3" />
				{#if data.article?.articleIsActive}
					activate
				{:else}
					de activate
				{/if}
			</Form.Button>
			<Form.Button type="submit" class="text-sm" disabled={loading}>
				{#if loading}
					<Reload class="mr-2 h-3 w-3 animate-spin" />
				{/if}
				Save</Form.Button
			>
		</div>
	</div>

	<div class="flex flex-col gap-4 lg:flex-row">
		<div class="flex-1">
			<Form.Field {config} name="articleTitle">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="articleCategoryId">
				<Form.Item>
					<Form.Label>Category:</Form.Label>
					<Form.Select bind:selected>
						<Form.SelectTrigger placeholder="Select a Category" />
						<Form.SelectContent>
							<Form.SelectGroup>
								<Form.SelectLabel>Categories</Form.SelectLabel>
								{#each data.categories as category}
									<Form.SelectItem value={category.id}>{category.name}</Form.SelectItem>
								{/each}
							</Form.SelectGroup>
						</Form.SelectContent>
					</Form.Select>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="articleShortDescription">
				<Form.Item>
					<Form.Label>Short Description</Form.Label>
					<Form.Textarea placeholder="Short Description" rows={8} />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</div>
	
		<div class="flex flex-[.6] flex-col gap-4 bg-secondary p-4 xl:flex-[.4]">
			<h1 class="font-semibold">Information:</h1>
			<Separator />
			<p class="text-secondary-foreground">
				Create At: {data.category?.createdAt ? new Date(data.category.createdAt).toDateString() : '-'}
			</p>
			<p class="text-secondary-foreground">
				Publish At: {data.category?.createdAt
					? new Date(data.category.createdAt).toDateString()
					: '-'}
			</p>

			<Button type="submit" formaction="?/delete" variant="destructive" class="w-fit px-10"
				>Delete Category <Trash size={20} /></Button
			>
		</div>
	</div>
	<div class="mb-20">
		<div bind:this={editor}></div>
		<textarea bind:this={articleContents} class="hidden" name="articleContents" />
	</div>
</Form.Root>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style> --> -->

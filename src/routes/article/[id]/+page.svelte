<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { Check, Reload, Trash } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';

	export let data;
	$: ({ form } = data);

	let selected: Selected<any> = {
		value: data.article?.articleCategory.id as string,
		label: data.article?.articleCategory.name as string
	};

	const options: FormOptions<FormSchema> = {
		async onSubmit() {
			loading = true;
		},
		onResult({ result }) {
			loading = false;
			if (result.status === 204) alert('Success!');
			if (result.status === 400) alert('Error!');
		}
	};

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

	onMount(async () => {
		const { default: Quill } = await import('quill');

		const quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});

		quill.root.innerHTML = data.article?.articleContents || '';

		quill.on('text-change', function () {
			articleContents.value = quill.root.innerHTML;
		});
	});

	let articleImage: ArrayBuffer | string | null;
	const onFileSelected = (event: Event) => {
		let image = (event.target as HTMLInputElement)?.files?.[0];
		let reader = new FileReader();
		if (image) {
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				if (e.target) {
					articleImage = e.target.result;
				}
			};
		}
	};
</script>

<Form.Root
	method="POST"
	action={data.id === 'new' ? '?/create' : '?/update'}
	class="grid gap-4"
	{form}
	{options}
	schema={formSchema}
	let:config
	enctype="multipart/form-data"
>
	<div class="mb-4 flex justify-between">
		<span class="text-xl font-semibold">Articles :</span>
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
					Un-Publish
				{:else}
					Publish
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
		<div class="flex-1">
			<Form.Field {config} name="articleImage">
				<Form.Item>
					<Form.Label for="articleImage">Image</Form.Label>
					<div class="flex w-full flex-col gap-4 sm:flex-row lg:flex-col 2xl:flex-row">
						<label
							for="articleImage"
							class="dark:hover:bg-bray-800 flex h-44 w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 sm:w-1/2 lg:w-full"
						>
							<div class="flex flex-col items-center justify-center pb-6 pt-5">
								<svg
									class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span class="font-semibold">Click to upload</span> or drag and drop
								</p>
								<p class="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<Form.Input
								id="articleImage"
								type="file"
								class="hidden"
								accept={['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].join(',')}
								on:change={(e) => onFileSelected(e)}
							/>
						</label>
						{#if articleImage || data.article?.articleImageSrc}
							<img
								alt="aticleImage"
								class="max-h-44 w-full flex-1 sm:w-1/2 lg:w-full 2xl:w-1/2"
								src={(articleImage && articleImage.toString()) ||
									'/articles/' + data.article?.articleImageSrc}
							/>
						{/if}
					</div>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="articleImageAlt">
				<Form.Item>
					<Form.Label>Image Alt</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="articleImageTitle">
				<Form.Item>
					<Form.Label>Image Title</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</div>
		<div class="flex flex-[.6] flex-col gap-4 bg-secondary p-4 xl:flex-[.4]">
			<h1 class="font-semibold">Information:</h1>
			<Separator />
			<p class="text-secondary-foreground">
				Create At: {data.article?.createdAt ? new Date(data.article.createdAt).toDateString() : '-'}
			</p>
			<p class="text-secondary-foreground">
				Publish At: {data.article?.createdAt
					? new Date(data.article.createdAt).toDateString()
					: '-'}
			</p>

			<Button type="submit" formaction="?/delete" variant="destructive" class="w-fit px-10"
				>Delete Article <Trash size={20} /></Button
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
</style>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { onMount } from 'svelte';
	import FormLayout from '$lib/components/FormLayout/FormLayout.svelte';

	export let data;
	$: ({ form, article } = data);

	let selected: Selected<any> = {
		value: data.article?.article.articleCategory.id as string,
		label: data.article?.article.articleCategory.name as string
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
	let articleContentsHTML: string;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		// Formats objects for setting up the Quill editor
		const formats = [
			'header',
			'font',
			'size',
			'bold',
			'italic',
			'underline',
			'align',
			'strike',
			'script',
			'blockquote',
			'background',
			'list',
			'bullet',
			'indent',
			'link',
			'image',
			'color',
			'code-block'
		];

		// Modules object for setting up the Quill editor
		const modules = {
			toolbar: {
				container: '#toolbar',
				handlers: {
					undo: undoChange,
					redo: redoChange
				}
			},
			history: {
				delay: 500,
				maxStack: 100,
				userOnly: true
			}
		};

		// Undo and redo functions for Custom Toolbar
		function undoChange() {
			quill.history.undo();
		}
		function redoChange() {
			quill.history.redo();
		}

		const quill = new Quill(editor, {
			modules,
			formats,
			theme: 'snow',
			placeholder: 'Write your article...'
		});

		quill.root.innerHTML = article?.article.articleContents || '';

		quill.on('text-change', function () {
			articleContentsHTML = quill.root.innerHTML;
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

<FormLayout
	let:config
	entry={article?.article}
	id={data.id}
	action={data.id === 'new' ? '?/create' : '?/update'}
	{form}
	{options}
	{formSchema}
	title="Articles"
	><div class="flex flex-col gap-4 lg:flex-row">
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
					<Form.Validation />
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
									<span class="font-semibold">Click to upload</span>
									<!-- or drag and drop -->
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
						{#if articleImage || article?.article.articleImageSrc}
							<img
								alt="aticleImage"
								class="max-h-44 w-full flex-1 sm:w-1/2 lg:w-full 2xl:w-1/2"
								src={(articleImage && articleImage.toString()) ||
									'/articles/' + article?.article.articleImageSrc}
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
	</div>
	<Form.Field {config} name="articleContents">
		<Form.Item>
			<Form.Label>Article Content</Form.Label>
			<div>
				<div id="toolbar">
					<span class="ql-formats">
						<select class="ql-font" value="arial">
							<option value="arial">Arial</option>
							<option value="comic-sans">Comic Sans</option>
							<option value="courier-new">Courier New</option>
							<option value="georgia">Georgia</option>
							<option value="helvetica">Helvetica</option>
							<option value="lucida">Lucida</option>
						</select>
						<select class="ql-size" value="medium">
							<option value="extra-small">Size 1</option>
							<option value="small">Size 2</option>
							<option value="medium">Size 3</option>
							<option value="large">Size 4</option>
						</select>
						<select class="ql-header" value="3">
							<option value="1">Heading</option>
							<option value="2">Subheading</option>
							<option value="3">Normal</option>
						</select>
					</span>
					<span class="ql-formats">
						<button class="ql-bold" />
						<button class="ql-italic" />
						<button class="ql-underline" />
						<button class="ql-strike" />
					</span>
					<span class="ql-formats">
						<button class="ql-list" value="ordered" />
						<button class="ql-list" value="bullet" />
						<button class="ql-indent" value="-1" />
						<button class="ql-indent" value="+1" />
					</span>
					<span class="ql-formats">
						<button class="ql-script" value="super" />
						<button class="ql-script" value="sub" />
						<button class="ql-blockquote" />
						<button class="ql-direction" />
					</span>
					<span class="ql-formats">
						<select class="ql-align" />
						<select class="ql-color" />
						<select class="ql-background" />
					</span>
					<span class="ql-formats">
						<button class="ql-link" />
						<button class="ql-image" />
						<button class="ql-video" />
					</span>
					<span class="ql-formats">
						<button class="ql-formula" />
						<button class="ql-code-block" />
						<button class="ql-clean" />
					</span>
					<span class="ql-formats">
						<button class="ql-undo">
							<!-- <CustomUndo /> -->
							<svg viewBox="0 0 18 18">
								<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
								<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
							</svg>
						</button>
						<button class="ql-redo">
							<!-- <CustomRedo /> -->
							<svg viewBox="0 0 18 18">
								<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
								<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
							</svg>
						</button>
					</span>
				</div>
				<div bind:this={editor}></div>
				<Form.Textarea value={articleContentsHTML} class="hidden" name="articleContents" />
				<Form.Validation />
			</div>
		</Form.Item>
	</Form.Field>
</FormLayout>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>

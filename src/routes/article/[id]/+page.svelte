<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { onMount } from 'svelte';
	import FormLayout from '$lib/components/FormLayout/FormLayout.svelte';
	import QuillEditor from '$lib/components/QuillEditor/QuillEditor.svelte';
	import { slugify } from '$lib/utils/common';
	import { Reload } from 'radix-icons-svelte';

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

		// @ts-ignore
		const { default: QuillBetterTable } = await import('quill-better-table');

		Quill.register(
			{
				'modules/better-table': QuillBetterTable
			},
			true
		);

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
			table: false, // disable table module
			'better-table': {
				operationMenu: {
					items: {
						unmergeCells: {
							text: 'Another unmerge cells name'
						}
					},
					color: {
						colors: ['#fff', 'red', 'rgb(0, 0, 0)'], // colors in operationMenu
						text: 'Background Colors' // subtitle
					}
				}
			},
			keyboard: {
				bindings: QuillBetterTable.keyboardBindings
			},
			toolbar: {
				container: '#toolbar',
				handlers: {
					undo: undoChange,
					redo: redoChange,
					addTable: () => addTable(3, 3)
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

		function addTable(x: number, y: number) {
			const tableModule = quill.getModule('better-table');
			tableModule.insertTable(x, y);
		}

		const quill = new Quill(editor, {
			modules,
			formats,
			theme: 'snow',
			placeholder: 'Write your article...'
		});

		// Add fonts to whitelist
		let Font = Quill.import('formats/font');
		// We do not add Sans Serif since it is the default
		Font.whitelist = ['nunito-bold'];
		Quill.register(Font, true);

		let quillColor = document.querySelector('#quillColor') as HTMLInputElement;
		if (quillColor) {
			quillColor.oninput = function () {
				let color = quillColor.value;
				quill.format('color', color);
			};
		}

		quill.root.innerHTML = article?.article.articleContents || '';

		quill.on('text-change', function () {
			const correctULTagFromQuill = (str: string) => {
				if (str) {
					let re = /(<ol><li data-list="bullet">)(.*?)(<\/ol>)/;
					let strArr = str.split(re);

					while (strArr.findIndex((ele) => ele === '<ol><li data-list="bullet">') !== -1) {
						let indx = strArr.findIndex((ele) => ele === '<ol><li data-list="bullet">');
						if (indx) {
							strArr[indx] = '<ul><li data-list="bullet">';
							let endTagIndex = strArr.findIndex((ele) => ele === '</ol>');
							strArr[endTagIndex] = '</ul>';
						}
					}
					return strArr.join('');
				}
				return str;
			};

			let content = correctULTagFromQuill(quill.root.innerHTML);
			articleContentsHTML = content;
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

	let title = '';
	const handleTitleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		title = target.value;
	};
</script>

<FormLayout
	entry={article?.article}
	id={data.id}
	action={data.id === 'new' ? '?/create' : '?/update'}
	{form}
	{options}
	{formSchema}
	title="Articles"
>
	<div slot="action-buttons">
		<Form.Button
			disabled={data.id === 'new' || loading}
			type="submit"
			name="publish"
			value={(!article?.article?.isPublished).toString()}
			class="text-sm"
		>
			{#if article?.article?.isPublished}
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
	<div slot="form" let:config>
		<div class="flex flex-col gap-4 lg:flex-row">
			<div class="flex-1">
				<Form.Field {config} name="articleTitle">
					<Form.Item>
						<Form.Label>Title</Form.Label>
						<Form.Input on:input={handleTitleInput} />
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
						<Form.Label>Short Description:</Form.Label>
						<Form.Textarea placeholder="Short Description" rows={8} />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="pageTitle">
					<Form.Item>
						<Form.Label>Page Title:</Form.Label>
						<Form.Input placeholder="Page Title" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="pageDescription">
					<Form.Item>
						<Form.Label>Page Description:</Form.Label>
						<Form.Input placeholder="Page Description" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<div class="flex-1">
				<Form.Field {config} name="articleImage">
					<Form.Item>
						<Form.Label for="articleImage">Image:</Form.Label>
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
						<Form.Label>Image Alt:</Form.Label>
						<Form.Input placeholder="Image Alt" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="articleImageTitle">
					<Form.Item>
						<Form.Label>Image Title:</Form.Label>
						<Form.Input placeholder="Image Title" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="redirectionURL">
					<Form.Item>
						<Form.Label>Redirection URL:</Form.Label>
						<Form.Input placeholder="Redirection URL" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Field {config} name="articleSlug">
					<Form.Item>
						<Form.Label>Slug:</Form.Label>
						<Form.Input value={slugify(title || article?.article.articleTitle || '')} disabled />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
		<Form.Field {config} name="articleContents">
			<Form.Item>
				<Form.Label>Article Content:</Form.Label>
				<QuillEditor bind:editor />
				<Form.Textarea value={articleContentsHTML} class="hidden" name="articleContents" />
			</Form.Item>
		</Form.Field>
	</div>
</FormLayout>

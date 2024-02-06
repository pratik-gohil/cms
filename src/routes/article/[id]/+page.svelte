<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { Check, Reload } from 'radix-icons-svelte';

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
</script>

<Form.Root
	method="POST"
	action={data.id === 'new' ? '?/create' : '?/update'}
	class="grid max-w-[460px] gap-4"
	{form}
	{options}
	schema={formSchema}
	let:config
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
	<Form.Field {config} name="articleImageSrc">
		<Form.Item>
			<Form.Label>Image Path</Form.Label>
			<Form.Input />
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
	<Form.Field {config} name="articleShortDescription">
		<Form.Item>
			<Form.Label>Short Description</Form.Label>
			<Form.Textarea placeholder="Short Description" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
</Form.Root>
